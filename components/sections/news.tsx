"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Post } from "@/lib/posts"

export function News() {
  const [newsItems, setNewsItems] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const posts = await response.json()
        // Get only the first 4 posts for the home page
        setNewsItems(posts.slice(0, 4))
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <section id="noticias" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">VIDA ESCOLAR</h2>
            <div className="w-20 h-1 bg-secondary mx-auto mb-4"></div>
          </div>
          <div className="text-center text-gray-600">Cargando noticias...</div>
        </div>
      </section>
    )
  }
  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">VIDA ESCOLAR</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4"></div>
        </div>

        {newsItems.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p>No hay noticias disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {newsItems.map((item) => (
              <Link
                key={item.id}
                href="/noticias"
                className="group block"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                  {item.image && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">
                      {formatDate(item.date)}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {item.excerpt || item.content}
                    </p>
                    <div className="flex items-center text-primary group-hover:text-secondary transition-colors font-medium">
                      Leer más <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-semibold"
            asChild
          >
            <Link href="/noticias">
              Ver más <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
