import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"

export default function CalendarioAcademico() {
  const meses = [
    { mes: "Marzo", eventos: ["Inicio del año escolar", "Reunión de apoderados", "Evaluación diagnóstica"] },
    { mes: "Abril", eventos: ["Semana de la convivencia escolar", "Día del libro", "Evaluaciones parciales"] },
    { mes: "Mayo", eventos: ["Día del estudiante", "Día del trabajo", "Actividades de mes de la patria"] },
    { mes: "Junio", eventos: ["Evaluaciones semestrales", "Día del padre", "Vacaciones de invierno"] },
    { mes: "Julio", eventos: ["Vacaciones de invierno", "Reinicio de clases"] },
    { mes: "Agosto", eventos: ["Día del niño", "Actividades culturales", "Evaluaciones parciales"] },
    { mes: "Septiembre", eventos: ["Fiestas patrias", "Actividades de mes de la patria", "Evaluaciones"] },
    { mes: "Octubre", eventos: ["Día del profesor", "Semana de la ciencia", "Evaluaciones parciales"] },
    { mes: "Noviembre", eventos: ["Evaluaciones finales", "Actividades de cierre", "Ceremonia de egresados"] },
    { mes: "Diciembre", eventos: ["Ceremonia de fin de año", "Entrega de resultados", "Vacaciones de verano"] },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Link href="/" className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Calendario Académico 2024</h1>
              <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Consulta las fechas importantes del año escolar, evaluaciones y actividades programadas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {meses.map((item) => (
                <Card key={item.mes} className="border-t-4 border-t-secondary">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{item.mes}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.eventos.map((evento, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start">
                          <span className="text-secondary mr-2">•</span>
                          <span>{evento}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">Información Importante</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Este calendario es una guía general. Las fechas específicas pueden estar sujetas a cambios. 
                  Para información actualizada, por favor contacta directamente con la escuela.
                </p>
                <p>
                  <strong>Horarios:</strong> Jornada Mañana: 08:00 - 13:45 hrs | Jornada Tarde: 14:00 - 19:00 hrs
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
