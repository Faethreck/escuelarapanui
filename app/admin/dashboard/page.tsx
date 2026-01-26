"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { PostList } from "@/components/admin/post-list"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <PostList />
    </AdminLayout>
  )
}
