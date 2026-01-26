"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "56984198975" // Replace with actual WhatsApp number
  const message = "Hola, me gustaría obtener más información sobre la Escuela Rapa Nui."

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl hover:shadow-[#25D366]/50 transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
        1
      </span>
    </button>
  )
}
