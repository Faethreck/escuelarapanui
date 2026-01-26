"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      
      // If we're on a subpage, navigate to home first
      if (pathname !== "/") {
        sessionStorage.setItem("scrollToHash", href)
        router.push("/")
      } else {
        // We're on home page, just scroll
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="relative w-32 h-40 mb-4">
              <Image
                src="/logo.png"
                alt="Escuela Rapa Nui Logo"
                width={128}
                height={160}
                className="object-contain"
                unoptimized
              />
            </div>
            <p className="text-gray-300 italic mb-4">Educando desde 1958</p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:escuelarapanui@gmail.com"
                className="text-gray-300 hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-secondary font-bold mb-4 text-lg">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => handleAnchorClick(e, "#inicio")}
                  className="text-gray-300 hover:text-secondary transition-colors cursor-pointer"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  onClick={(e) => handleAnchorClick(e, "#nosotros")}
                  className="text-gray-300 hover:text-secondary transition-colors cursor-pointer"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#noticias"
                  onClick={(e) => handleAnchorClick(e, "#noticias")}
                  className="text-gray-300 hover:text-secondary transition-colors cursor-pointer"
                >
                  Vida Escolar
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  onClick={(e) => handleAnchorClick(e, "#galeria")}
                  className="text-gray-300 hover:text-secondary transition-colors cursor-pointer"
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={(e) => handleAnchorClick(e, "#contacto")}
                  className="text-gray-300 hover:text-secondary transition-colors cursor-pointer"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-secondary font-bold mb-4 text-lg">Información</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/proyecto-educativo" className="text-gray-300 hover:text-secondary transition-colors">
                  Proyecto Educativo
                </Link>
              </li>
              <li>
                <Link href="/calendario-academico" className="text-gray-300 hover:text-secondary transition-colors">
                  Calendario Académico
                </Link>
              </li>
              <li>
                <Link href="/reglamento-interno" className="text-gray-300 hover:text-secondary transition-colors">
                  Reglamento Interno
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-secondary font-bold mb-4 text-lg">Contacto</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-secondary flex-shrink-0" />
                <span>Av. Las Torres 935<br />Lo Prado, Región Metropolitana</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-secondary flex-shrink-0" />
                <a href="tel:+56227730784" className="hover:text-secondary transition-colors">
                  (2) 2730-784
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-secondary flex-shrink-0" />
                <a
                  href="mailto:escuelarapanui@gmail.com"
                  className="hover:text-secondary transition-colors"
                >
                  escuelarapanui@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Escuela Particular Nº 371 Rapa Nui. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
