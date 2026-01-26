import Image from "next/image"

const galleryImages = [
  {
    src: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    alt: "Actividades escolares",
  },
  {
    src: "https://escuelarapanui.cl/wp-content/uploads/2022/12/dsc00621-scaled.jpg",
    alt: "Estudiantes en clases",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOwbV3L0Jtq1LG3-oYTKZjEVhn0uDNQ0cvSg&s",
    alt: "Eventos escolares",
  },
  {
    src: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    alt: "Comunidad educativa",
  },
  {
    src: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    alt: "Actividades deportivas",
  },
  {
    src: "https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg",
    alt: "Talleres y actividades",
  },
]

export function Gallery() {
  return (
    <section id="galeria" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Galería</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Momentos especiales de nuestra comunidad educativa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
