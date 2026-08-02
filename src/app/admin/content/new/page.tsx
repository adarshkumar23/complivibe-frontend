"use client";

import AdminAuthGuard from "@/components/AdminAuthGuard";
import AdminContentForm from "@/components/AdminContentForm";

/** Create a new CMS row. Guarded client-side — there is no middleware here. */
export default function NewContentPage() {
  return (
    <AdminAuthGuard>
      <AdminContentForm mode="create" />
    </AdminAuthGuard>
  );
}
