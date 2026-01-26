import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText } from "lucide-react"
import Link from "next/link"

export default function ProyectoEducativo() {
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
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Proyecto Educativo</h1>
              <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Conoce nuestra misión, visión y los principios que guían nuestra labor educativa
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Documento del Proyecto Educativo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">
                  Descarga el documento completo del Proyecto Educativo Institucional de la Escuela Particular Nº 371 Rapa Nui.
                </CardDescription>
                <a href="/ProyectoEducativo.pdf" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar PDF
                  </Button>
                </a>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Nuestra Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    La Escuela Particular Nº 371 "Rapa Nui" tiene como misión proporcionar una educación integral de calidad, 
                    que promueva el desarrollo académico, social y emocional de nuestros estudiantes. Nos comprometemos a 
                    crear un ambiente inclusivo y acogedor donde cada niño y niña pueda desarrollar su potencial, respetando 
                    su individualidad y fomentando valores como el respeto, la responsabilidad y la solidaridad.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Nuestra Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Ser reconocidos como una institución educativa de excelencia en Lo Prado, que forma estudiantes integrales, 
                    comprometidos con su comunidad y preparados para enfrentar los desafíos del futuro. Aspiramos a ser un 
                    referente en educación inclusiva, donde la diversidad sea valorada y cada estudiante encuentre las 
                    oportunidades para crecer y desarrollarse plenamente.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Valores Institucionales</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span><strong>Respeto:</strong> Valoramos la dignidad de cada persona y promovemos el respeto mutuo en toda nuestra comunidad educativa.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span><strong>Responsabilidad:</strong> Fomentamos el cumplimiento de deberes y el compromiso con el aprendizaje y el crecimiento personal.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span><strong>Solidaridad:</strong> Promovemos el trabajo colaborativo y el apoyo mutuo entre estudiantes, familias y docentes.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span><strong>Inclusión:</strong> Acogemos y valoramos la diversidad, creando espacios donde todos se sientan parte de nuestra comunidad.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">•</span>
                      <span><strong>Excelencia:</strong> Buscamos la mejora continua y la calidad en todos los aspectos de nuestra labor educativa.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
