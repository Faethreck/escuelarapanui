"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { Carousel } from "@/components/ui/carousel"

const heroSlides = [
  {
    image: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
  },
  {
    image: "https://escuelarapanui.cl/wp-content/uploads/2022/12/dsc00621-scaled.jpg",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwbV3L0Jtq1LG3-oYTKZjEVhn0uDNQ0cvSg&s",
  },
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Carousel Background */}
      <div className="absolute inset-0">
        <Carousel slides={heroSlides} autoPlay={true} interval={6000} />
      </div>

      {/* Overlay Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white drop-shadow-lg">
            Escuela Particular Nº 371
            <br />
            <span className="text-secondary">Rapa Nui</span>
          </h1>
          <p className="text-xl md:text-2xl mb-2 text-secondary font-semibold drop-shadow-md">
            Educando desde 1958
          </p>
          <p className="text-lg md:text-xl mb-8 text-white max-w-2xl mx-auto drop-shadow-md">
            Una escuela inclusiva que acoge a todas las familias de Lo Prado
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-center border border-white/30 shadow-lg">
              <div className="text-3xl font-bold text-secondary mb-1">185</div>
              <div className="text-sm text-white">Estudiantes</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-center border border-white/30 shadow-lg">
              <div className="text-3xl font-bold text-secondary mb-1">65+</div>
              <div className="text-sm text-white">Años de experiencia</div>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-secondary text-primary hover:bg-accent shadow-lg"
            onClick={() => {
              document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Conoce más
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
