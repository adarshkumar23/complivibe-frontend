"use client";

import { useSyncExternalStore } from "react";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLoginForm from "@/components/AdminLoginForm";
import {
  subscribeToken,
  tokenSnapshot,
  tokenServerSnapshot,
} from "@/lib/adminApi";

/**
 * The admin entry point: login screen or content dashboard, decided entirely in
 * the browser.
 *
 * This route exports as a static HTML shell (there is no server here), so the
 * token check runs after hydration. `tokenServerSnapshot` returns null, which
 * makes the prerendered markup the login screen — the same thing a signed-out
 * visitor sees — so hydration never mismatches.
 */
export default function AdminPage() {
  const token = useSyncExternalStore(
    subscribeToken,
    tokenSnapshot,
    tokenServerSnapshot,
  );

  return token ? <AdminDashboard /> : <AdminLoginForm />;
}
