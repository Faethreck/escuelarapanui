"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { PostForm, PostFormData } from "@/components/admin/post-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NewPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Error al crear la publicación')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error al crear la publicación')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <Link href="/admin/dashboard">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Dashboard
          </Button>
        </Link>

        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">Nueva Publicación</h2>
          <p className="text-gray-600">Complete el formulario para crear una nueva publicación</p>
        </div>

        <PostForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </AdminLayout>
  )
}
