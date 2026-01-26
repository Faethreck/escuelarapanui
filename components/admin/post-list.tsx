"use client"

import { useState, useEffect } from "react"
import { Post } from "@/lib/posts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Plus, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PostListProps {
  onDelete?: (id: number) => void
}

export function PostList({ onDelete }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredPosts(filtered)
    } else {
      setFilteredPosts(posts)
    }
  }, [searchTerm, posts])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Está seguro que desea eliminar esta publicación?')) {
      return
    }

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts()
        if (onDelete) {
          onDelete(id)
        }
      } else {
        alert('Error al eliminar la publicación')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error al eliminar la publicación')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-primary">Cargando publicaciones...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar publicaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
        <Link href="/admin/posts/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nueva Publicación
          </Button>
        </Link>
      </div>

      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'No se encontraron publicaciones' : 'No hay publicaciones aún'}
            </p>
            {!searchTerm && (
              <Link href="/admin/posts/new">
                <Button>Crear Primera Publicación</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="flex flex-col">
              {post.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                    unoptimized
                  />
                </div>
              )}
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-primary">
                    {formatDate(post.date)}
                  </span>
                  {post.category && (
                    <span className="ml-2 text-xs bg-secondary/20 text-primary px-2 py-1 rounded">
                      {post.category}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">Por {post.author}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-1">
                  {post.excerpt || post.content}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Link href={`/admin/posts/${post.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Edit className="h-4 w-4" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(post.id)}
                    className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
