import Link from "next/link"
import Image from "next/image"

const quickLinks = [
  {
    image: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    title: "Proyecto Educativo",
    href: "/proyecto-educativo",
  },
  {
    image: "https://escuelarapanui.cl/wp-content/uploads/2022/12/dsc00621-scaled.jpg",
    title: "Calendario Académico",
    href: "/calendario-academico",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwbV3L0Jtq1LG3-oYTKZjEVhn0uDNQ0cvSg&s",
    title: "Reglamento Interno",
    href: "/reglamento-interno",
  },
  {
    image: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    title: "Galería",
    href: "#galeria",
  },
]

export function QuickLinks() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  src={link.image}
                  alt={link.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
                    {link.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
