"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allNewsItems = [
  {
    date: "15 Mar 2024",
    title: "Actividades de Inicio de Año",
    description: "Damos la bienvenida a todos nuestros estudiantes y familias en este nuevo año escolar 2024. Este año promete ser lleno de aprendizajes, crecimiento y nuevas experiencias para toda nuestra comunidad educativa.",
    fullContent: "La Escuela Particular Nº 371 Rapa Nui ha iniciado el año escolar 2024 con gran entusiasmo y energía. Durante las primeras semanas, hemos realizado diversas actividades de bienvenida para nuestros estudiantes y sus familias. Estas actividades incluyen reuniones de apoderados, presentaciones de los equipos docentes, y actividades recreativas para que los estudiantes se conozcan y se integren mejor a la comunidad escolar.",
    image: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    category: "Eventos",
  },
  {
    date: "10 Mar 2024",
    title: "Reunión de Apoderados",
    description: "Invitamos a todas las familias a participar en nuestra reunión de inicio de año escolar. Un espacio importante para conocer a los profesores y el proyecto educativo.",
    fullContent: "Las reuniones de apoderados son fundamentales para establecer una comunicación efectiva entre la escuela y las familias. En estas reuniones, los profesores presentan los objetivos del año, las metodologías de trabajo, y las expectativas para cada nivel. También se abordan temas importantes como la convivencia escolar, el uso de uniformes, y las actividades programadas para el año.",
    image: "https://escuelarapanui.cl/wp-content/uploads/2022/12/dsc00621-scaled.jpg",
    category: "Comunidad",
  },
  {
    date: "5 Mar 2024",
    title: "Talleres Extracurriculares",
    description: "Conoce nuestra oferta de talleres y actividades para el desarrollo integral de nuestros estudiantes. Inscripciones abiertas.",
    fullContent: "Nuestra escuela ofrece una amplia variedad de talleres extracurriculares diseñados para complementar la formación académica de nuestros estudiantes. Entre los talleres disponibles se encuentran: deportes (fútbol, básquetbol, vóleibol), artes (pintura, música, teatro), tecnología (robótica, programación), y actividades recreativas. Estos talleres se realizan después del horario escolar y están abiertos a todos los estudiantes interesados.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwbV3L0Jtq1LG3-oYTKZjEVhn0uDNQ0cvSg&s",
    category: "Actividades",
  },
  {
    date: "1 Mar 2024",
    title: "Campeonato Deportivo",
    description: "Nuestros estudiantes destacan en competencias deportivas regionales. Felicitaciones a todos los participantes.",
    fullContent: "Estamos orgullosos de anunciar que nuestros estudiantes han participado exitosamente en diversos campeonatos deportivos a nivel regional. El esfuerzo, dedicación y trabajo en equipo demostrado por nuestros alumnos ha sido ejemplar. Estos logros deportivos no solo fortalecen las habilidades físicas de nuestros estudiantes, sino que también promueven valores como el respeto, la perseverancia y el compañerismo.",
    image: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    category: "Deportes",
  },
  {
    date: "25 Feb 2024",
    title: "Inicio del Año Escolar 2024",
    description: "Bienvenidos al nuevo año escolar. Esperamos que sea un año lleno de aprendizajes y crecimiento para todos.",
    fullContent: "El año escolar 2024 ha comenzado con mucha energía y entusiasmo. Nuestro equipo docente está comprometido con brindar una educación de calidad que promueva el desarrollo integral de cada estudiante. Este año continuaremos trabajando en nuestros pilares fundamentales: excelencia académica, formación en valores, y desarrollo de habilidades para la vida.",
    image: "https://escuelarapanui.cl/wp-content/uploads/2022/12/dsc00621-scaled.jpg",
    category: "Eventos",
  },
  {
    date: "20 Feb 2024",
    title: "Preparación para el Nuevo Año",
    description: "Nuestro equipo se prepara para recibir a los estudiantes con las mejores condiciones y un ambiente acogedor.",
    fullContent: "Durante las semanas previas al inicio de clases, nuestro equipo trabajó intensamente en la preparación de las salas, la organización de materiales, y la planificación de las actividades del año. Nos aseguramos de que cada espacio esté listo para recibir a nuestros estudiantes en un ambiente seguro, limpio y acogedor que favorezca el aprendizaje.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwbV3L0Jtq1LG3-oYTKZjEVhn0uDNQ0cvSg&s",
    category: "Comunidad",
  },
]

export default function NoticiasPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNewsItems.map((item, index) => (
              <article
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-primary mb-2">{item.date}</div>
                  <h2 className="text-2xl font-bold text-primary mb-3">{item.title}</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  <p className="text-gray-700 leading-relaxed mb-4">{item.fullContent}</p>
                </div>
              </article>
            ))}
          </div>

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
