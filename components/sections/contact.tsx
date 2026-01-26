"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Phone, Mail } from "lucide-react"
import { useState } from "react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Contacto</h2>
          <div className="w-20 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=Av+Las+Torres+935,+Lo+Prado,+Región+Metropolitana,+Chile&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la Escuela Rapa Nui"
              className="w-full"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Ubicación</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-2">
                  Av. Las Torres 935
                  <br />
                  Lo Prado, Región Metropolitana
                </p>
                <a
                  href="https://maps.google.com/?q=Av+Las+Torres+935+Lo+Prado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors font-medium"
                >
                  Ver en Google Maps →
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Horario de Atención</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  <strong>Jornada Mañana:</strong>
                  <br />
                  08:00 - 13:45 hrs
                  <br />
                  <br />
                  <strong>Jornada Tarde:</strong>
                  <br />
                  14:00 - 19:00 hrs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Contacto</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-700">
                  <strong>Teléfono:</strong>
                  <br />
                  <a href="tel:+56227730784" className="text-primary hover:text-secondary transition-colors">
                    (2) 2730-784
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong>
                  <br />
                  <a
                    href="mailto:escuelarapanui@gmail.com"
                    className="text-primary hover:text-secondary transition-colors"
                  >
                    escuelarapanui@gmail.com
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Mensaje"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-vertical"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
