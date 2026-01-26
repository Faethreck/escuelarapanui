"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Post } from "@/lib/posts"

export default function NoticiasPage() {
  const [allNewsItems, setAllNewsItems] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const posts = await response.json()
        setAllNewsItems(posts)
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
      month: 'long',
      day: 'numeric',
    })
  }
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/#noticias"
              className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Vida Escolar
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">VIDA ESCOLAR</h1>
            <div className="w-20 h-1 bg-secondary mb-4"></div>
            <p className="text-lg text-gray-600 max-w-3xl">
              Mantente al día con todas las noticias, eventos y actividades de nuestra comunidad educativa.
            </p>
          </div>

          {/* News Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-gray-600">
              <p>Cargando noticias...</p>
            </div>
          ) : allNewsItems.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              <p>No hay noticias disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allNewsItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {item.image && (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      {item.category && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-sm font-semibold text-primary mb-2">
                      {formatDate(item.date)}
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-3">{item.title}</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">{item.excerpt || item.content}</p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.content}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Back to Top Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-semibold"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Volver arriba
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
