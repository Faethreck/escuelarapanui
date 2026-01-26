import Image from "next/image"

export function Banner() {
  return (
    <section className="py-8 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-primary text-lg md:text-xl font-semibold">
              Formando estudiantes integrales con valores y excelencia académica
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
