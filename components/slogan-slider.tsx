'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slogans = [
  "Ihre Heizung der Zukunft: Wärme pumpen, statt Energie verschwenden.",
  "Wärmepumpen schießen nicht. Machen Sie sich unabhängig von Blut-Öl.",
  "Lieber Strom vom eigenen Dach als Granaten im fremden Land finanziert.",
  "Ihr Enkel soll im Garten spielen, nicht für Ihr Heizöl an die Front. Wechseln Sie zur Wärmepumpe - bevor das Öl Blut kostet.",
  "Wärmepumpe: Weil man Frieden nicht importieren kann, aber Wärme selbst erzeugen schon.",
  "Jede Öllieferung ist eine Patrone mehr im Magazin der Falschen. Entwaffnen Sie die Despoten - mit Bielmeier Haustechnik.",
]

export function SloganSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slogans.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[120px] md:min-h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center text-xl md:text-2xl lg:text-3xl font-semibold text-white leading-relaxed"
            >
              <span className="text-brand-green">"</span>
              {slogans[currentIndex]}
              <span className="text-brand-green">"</span>
            </motion.p>
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center gap-2 mt-4">
          {slogans.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-brand-green w-6' : 'bg-gray-600 hover:bg-gray-500'}`}
              aria-label={`Spruch ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
