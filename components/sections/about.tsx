import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Heart, Users, Award } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: GraduationCap,
    title: "Educación Integral",
    description: "Desarrollamos habilidades académicas, sociales y emocionales para el desarrollo pleno de nuestros estudiantes.",
  },
  {
    icon: Heart,
    title: "Inclusión y Acogida",
    description: "Abrazamos la diversidad y acogemos a todas las familias de Lo Prado. Creemos que cada niño y niña tiene derecho a una educación de calidad.",
  },
  {
    icon: Users,
    title: "Compromiso Comunitario",
    description: "Somos parte de la comunidad de Lo Prado y trabajamos junto a las familias para brindar apoyo integral.",
  },
  {
    icon: Award,
    title: "Tradición y Vocación",
    description: "Más de seis décadas de experiencia educativa con esmero, sacrificio y vocación en Lo Prado.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Nosotros</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://escuelarapanui.cl/wp-content/uploads/bfi_thumb/20221118_114346-2-scaled-e1669295225393-py6oeiougg7la94y4tngvzkqgp9iytlawg5ytcu860.jpg"
                alt="Actividades escolares"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                La <strong className="text-primary">Escuela Particular Nº 371 &quot;Rapa Nui&quot;</strong> fue fundada en el año 1958 y es un establecimiento educacional que atiende a niños de Nivel Preescolar y Educación Básica en la comuna de Lo Prado.
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Somos una escuela <strong>inclusiva y acogedora</strong> que abraza a todas las familias de nuestra comuna. Entendemos que cada niño y niña viene con su propia historia, realidad y necesidades. Por eso, nuestro compromiso es crear un ambiente cálido y seguro donde todos se sientan valorados y respetados, independientemente de su origen o situación socioeconómica.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Nuestro compromiso es lograr aprendizajes de calidad para potenciar el desarrollo integral e inclusivo de nuestros estudiantes. Entregamos herramientas para que nuestros niños, niñas y jóvenes sepan conducirse en una cultura de la información y actualización constante del conocimiento, con valores, habilidades y destrezas que hagan posible su pleno desarrollo.
          </p>
          <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded-r-lg my-8">
            <p className="text-lg italic text-primary font-medium">
              &quot;Matemáticas y Ciencias, Deporte y Religión nos preparan con esmero, sacrificio y vocación&quot;
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="text-3xl">🌟</span> Somos una escuela para todos
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              En la Escuela Rapa Nui, ubicada en Lo Prado, trabajamos día a día para ser un espacio de encuentro, crecimiento y oportunidades para todas las familias. Creemos firmemente que la educación de calidad debe ser accesible para todos, y nos enorgullece ser parte de una comunidad diversa y resiliente.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Si estás buscando un colegio que valore a tu hijo o hija por quienes son, donde se sientan acogidos y puedan desarrollar todo su potencial, <strong className="text-primary">este es el lugar para ustedes</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="border-t-4 border-t-secondary">
                <CardHeader>
                  <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
