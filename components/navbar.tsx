"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label?: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      
      // If we're on a subpage, navigate to home first
      if (pathname !== "/") {
        // Store the hash to scroll to after navigation
        sessionStorage.setItem("scrollToHash", href)
        router.push("/")
      } else {
        // We're on home page, just scroll
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
      
      setIsOpen(false)
      setOpenDropdown(null)
    }
  }

  const menuItems = [
    {
      label: "Inicio",
      href: "#inicio",
    },
    {
      label: "Nosotros",
      href: "#nosotros",
      submenu: [
        { label: "Quiénes somos", href: "#nosotros" },
        { label: "Proyecto Educativo", href: "/proyecto-educativo" },
        { label: "Calendario Académico", href: "/calendario-academico" },
        { label: "Reglamento Interno", href: "/reglamento-interno" },
      ],
    },
    {
      label: "Vida Escolar",
      href: "#noticias",
    },
    {
      label: "Galería",
      href: "#galeria",
    },
    {
      label: "Contacto",
      href: "#contacto",
    },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <div className="relative w-24 h-28 md:w-28 md:h-32">
              <Image
                src="/logo.png"
                alt="Escuela Rapa Nui Logo"
                width={112}
                height={128}
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.submenu && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.submenu ? (
                  <>
                    <button className="flex items-center space-x-1 hover:text-secondary transition-colors font-medium py-2">
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div className="absolute top-full left-0 pt-2 w-64">
                        <div className="bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem.label}
                              href={subitem.href}
                              onClick={(e) => handleLinkClick(e, subitem.href, subitem.label)}
                              className="block px-4 py-2 text-primary hover:bg-secondary/10 hover:text-secondary transition-colors"
                            >
                              {subitem.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href, item.label)}
                    className="hover:text-secondary transition-colors font-medium cursor-pointer py-2 block"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.submenu ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full py-2 hover:text-secondary transition-colors font-medium"
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div className="pl-4 space-y-2">
                          {item.submenu.map((subitem) => (
                            <a
                              key={subitem.label}
                              href={subitem.href}
                              onClick={(e) => handleLinkClick(e, subitem.href, subitem.label)}
                              className="block py-2 text-gray-300 hover:text-secondary transition-colors"
                            >
                              {subitem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href, item.label)}
                      className="block py-2 hover:text-secondary transition-colors font-medium"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
