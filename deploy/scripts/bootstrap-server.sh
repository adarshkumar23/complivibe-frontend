#!/usr/bin/env bash
#
# One-time server setup for a fresh Ubuntu 24.04 EC2 instance.
# Run as root (or under sudo) on the box, once:
#
#   sudo bash bootstrap-server.sh
#
# Idempotent — safe to re-run if it fails partway through.

set -euo pipefail

SERVICE_USER="complivibe"
NODE_MAJOR="24"          # matches the version the frontend is developed against
APP_ROOT="/srv/complivibe"
UPLOADS_DIR="/var/lib/complivibe/uploads"
BACKUP_DIR="/var/backups/complivibe"

log() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }

if [[ $EUID -ne 0 ]]; then
  echo "Run this as root: sudo bash $0" >&2
  exit 1
fi

log "Updating base packages"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg git ufw

log "Adding 2 GiB of swap"
# The Next build is the only memory spike on this box. Swap costs nothing and
# turns a hard OOM kill mid-deploy into a merely slow build.
if ! swapon --show | grep -q '/swapfile'; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
else
  echo "swap already present, skipping"
fi

log "Installing nginx and certbot"
apt-get install -y nginx certbot python3-certbot-nginx

log "Installing Node.js ${NODE_MAJOR}.x"
if ! command -v node >/dev/null 2>&1 || [[ "$(node -v)" != v${NODE_MAJOR}.* ]]; then
  curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -
  apt-get install -y nodejs
fi
node -v
npm -v

log "Installing Docker Engine and the Compose plugin"
if ! command -v docker >/dev/null 2>&1; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
    -o /etc/apt/keyrings/docker.asc
  chmod a+r /etc/apt/keyrings/docker.asc
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io \
                     docker-buildx-plugin docker-compose-plugin
fi
systemctl enable --now docker
docker --version
docker compose version

log "Creating the ${SERVICE_USER} service user"
# A system user with a shell (it runs deploy scripts) but no password login.
if ! id -u "$SERVICE_USER" >/dev/null 2>&1; then
  useradd --system --create-home --shell /bin/bash "$SERVICE_USER"
fi
# Needed to run `docker compose` for the CMS stack without sudo.
usermod -aG docker "$SERVICE_USER"

log "Creating the directory layout"
# Deployed releases. `current` is a symlink swapped atomically at deploy time,
# so a half-copied release is never served.
install -d -o "$SERVICE_USER" -g "$SERVICE_USER" "$APP_ROOT"
install -d -o "$SERVICE_USER" -g "$SERVICE_USER" "$APP_ROOT/src"
install -d -o "$SERVICE_USER" -g "$SERVICE_USER" "$APP_ROOT/frontend"
install -d -o "$SERVICE_USER" -g "$SERVICE_USER" "$APP_ROOT/frontend/releases"

# Uploaded cover images: the only application state that is not in Postgres,
# and the reason this lives under /var/lib rather than inside the deploy
# directory — a redeploy replaces the release tree and would take the uploads
# with it.
#
# Owned by UID 1000 because that is the `node` user inside the CMS container,
# which is what actually writes here through the bind mount. Docker does not
# chown a bind mount the way it seeds a named volume.
install -d -o 1000 -g 1000 -m 0755 /var/lib/complivibe
install -d -o 1000 -g 1000 -m 0755 "$UPLOADS_DIR"

install -d -o "$SERVICE_USER" -g "$SERVICE_USER" -m 0750 "$BACKUP_DIR"

# deploy-frontend.sh reloads nginx after swapping the release symlink. That is
# the only privileged thing it does, so grant exactly that and nothing else
# rather than giving the service user general sudo.
cat > /etc/sudoers.d/complivibe <<'SUDOERS'
complivibe ALL=(root) NOPASSWD: /usr/bin/systemctl reload nginx
SUDOERS
chmod 0440 /etc/sudoers.d/complivibe
visudo -cf /etc/sudoers.d/complivibe

install -d -m 0755 /var/cache/nginx/complivibe
chown -R www-data:www-data /var/cache/nginx/complivibe

log "Configuring the firewall"
# Defence in depth behind the security group: 4000 and 5432 are already bound
# to 127.0.0.1, have no SG ingress rule, and are denied here too.
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status verbose

log "Done"
cat <<EOF

Next steps:
  1. Clone both repos into ${APP_ROOT}/src as the ${SERVICE_USER} user
  2. Fill in ${APP_ROOT}/src/complivibe-cms/.env from deploy/.env.production.example
  3. Bring the CMS up (see the CMS repo's deploy/README)
  4. Run deploy-frontend.sh
  5. Install the nginx site config, then run certbot

EOF
