"use client";

import AdminAuthGuard from "@/components/AdminAuthGuard";
import AdminLeads from "@/components/AdminLeads";

/**
 * Submissions from the public Book a Demo and waitlist forms. Guarded
 * client-side — this is a static export, so there is no middleware here.
 *
 * Inherits `robots: { index: false, follow: false, nocache: true }` from the
 * /admin layout, and is linked only from the admin header.
 */
export default function AdminLeadsPage() {
  return (
    <AdminAuthGuard>
      <AdminLeads />
    </AdminAuthGuard>
  );
}
