"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { Banner } from "@/components/sections/banner"
import { QuickLinks } from "@/components/sections/quick-links"
import { About } from "@/components/sections/about"
import { News } from "@/components/sections/news"
import { Gallery } from "@/components/sections/gallery"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Handle GitHub Pages 404 redirect (SPA routing)
    const path = searchParams.get('/')
    if (path) {
      const cleanPath = path.replace(/~and~/g, '&')
      window.history.replaceState(null, '', cleanPath)
    }

    // Check if we need to scroll to a section after navigation from subpage
    const scrollToHash = sessionStorage.getItem("scrollToHash")
    if (scrollToHash) {
      sessionStorage.removeItem("scrollToHash")
      // Wait for page to fully render
      setTimeout(() => {
        const element = document.querySelector(scrollToHash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [searchParams])

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Banner />
      <QuickLinks />
      <About />
      <News />
      <Gallery />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
