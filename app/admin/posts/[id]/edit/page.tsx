"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { PostForm, PostFormData } from "@/components/admin/post-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Post } from "@/lib/posts"

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = parseInt(params.id as string)
  
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [postId])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`)
      if (response.ok) {
        const data = await response.json()
        setPost(data)
      } else {
        alert('Publicación no encontrada')
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      alert('Error al cargar la publicación')
      router.push('/admin/dashboard')
    } finally {
      setIsFetching(false)
    }
  }

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Error al actualizar la publicación')
      }
    } catch (error) {
      console.error('Error updating post:', error)
      alert('Error al actualizar la publicación')
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="text-primary">Cargando...</div>
        </div>
      </AdminLayout>
    )
  }

  if (!post) {
    return null
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
          <h2 className="text-2xl font-bold text-primary mb-2">Editar Publicación</h2>
          <p className="text-gray-600">Modifique los campos que desee actualizar</p>
        </div>

        <PostForm
          initialData={{
            title: post.title,
            author: post.author,
            date: post.date,
            content: post.content,
            excerpt: post.excerpt,
            image: post.image || "",
            category: post.category || "",
          }}
          onSubmit={handleSubmit}
          submitLabel="Actualizar Publicación"
          isLoading={isLoading}
        />
      </div>
    </AdminLayout>
  )
}
