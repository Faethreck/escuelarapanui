import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function ReglamentoInterno() {
  const secciones = [
    {
      icon: Users,
      title: "Derechos y Deberes",
      content: [
        "Derecho a recibir una educación de calidad",
        "Derecho a ser tratado con respeto y dignidad",
        "Derecho a participar en actividades escolares",
        "Deber de asistir regularmente a clases",
        "Deber de respetar a compañeros, docentes y personal",
        "Deber de cumplir con las normas de convivencia escolar"
      ]
    },
    {
      icon: Shield,
      title: "Normas de Convivencia",
      content: [
        "Respeto mutuo entre todos los miembros de la comunidad educativa",
        "Uso adecuado de las instalaciones y materiales escolares",
        "Puntualidad en la asistencia a clases y actividades",
        "Uso correcto del uniforme escolar",
        "Prohibición de elementos que puedan causar daño",
        "Comunicación respetuosa y constructiva"
      ]
    },
    {
      icon: BookOpen,
      title: "Procedimientos Disciplinarios",
      content: [
        "Sistema de amonestaciones progresivas",
        "Comunicación con apoderados en caso de incumplimientos",
        "Medidas formativas y reparatorias",
        "Suspensión temporal en casos graves",
        "Apoyo psicosocial cuando sea necesario",
        "Enfoque en la formación y aprendizaje"
      ]
    }
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Reglamento Interno</h1>
              <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conoce las normas, derechos y deberes que rigen nuestra comunidad educativa
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {secciones.map((seccion) => {
                const Icon = seccion.icon
                return (
                  <Card key={seccion.title} className="border-t-4 border-t-secondary">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">{seccion.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {seccion.content.map((item, index) => (
                          <li key={index} className="text-gray-700 leading-relaxed flex items-start">
                            <span className="text-secondary mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Card className="bg-primary/5 border border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl text-primary">Información Adicional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  El Reglamento Interno tiene como objetivo establecer las normas de convivencia que permitan 
                  un ambiente educativo adecuado, respetuoso y seguro para todos los miembros de nuestra comunidad.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Para consultas específicas sobre el reglamento o situaciones particulares, por favor contacta 
                  con la dirección del establecimiento. Estamos comprometidos con la formación integral de nuestros 
                  estudiantes y el bienestar de toda la comunidad educativa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
