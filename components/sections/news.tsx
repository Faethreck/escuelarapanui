import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const newsItems = [
  {
    date: "15 Mar 2024",
    title: "Actividades de Inicio de Año",
    description: "Damos la bienvenida a todos nuestros estudiantes y familias en este nuevo año escolar 2024.",
    image: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    link: "#",
  },
  {
    date: "10 Mar 2024",
    title: "Reunión de Apoderados",
    description: "Invitamos a todas las familias a participar en nuestra reunión de inicio de año escolar.",
    image: "https://escuelarapanui.cl/wp-content/uploads/2022/12/dsc00621-scaled.jpg",
    link: "#",
  },
  {
    date: "5 Mar 2024",
    title: "Talleres Extracurriculares",
    description: "Conoce nuestra oferta de talleres y actividades para el desarrollo integral de nuestros estudiantes.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwbV3L0Jtq1LG3-oYTKZjEVhn0uDNQ0cvSg&s",
    link: "#",
  },
  {
    date: "1 Mar 2024",
    title: "Campeonato Deportivo",
    description: "Nuestros estudiantes destacan en competencias deportivas regionales.",
    image: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    link: "#",
  },
]

export function News() {
  return (
    <section id="noticias" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">VIDA ESCOLAR</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {newsItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.link}
              className="group block"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-primary mb-2">{item.date}</div>
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex items-center text-primary group-hover:text-secondary transition-colors font-medium">
                    Leer más <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

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
