'use client'

import { useEffect, useRef } from 'react'
import { Calculator } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeizungsrechnerPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current) return
    scriptLoadedRef.current = true

    // Load the external Meister1 script
    const script = document.createElement('script')
    script.src = 'https://offerio.meister1.com/init.js'
    script.type = 'text/javascript'
    script.onload = () => {
      // Initialize Lokalleads after script loads
      const licenceCode = 'LL-1774529252295-6424-64049-69579-CL'
      const options = {
        selector: '#meister1_LL-1774529252295-6424-64049-69579-CL'
      }
      if (typeof (window as any).Lokalleads !== 'undefined') {
        ;(window as any).Lokalleads.init(licenceCode, options)
      }
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup on unmount
      try {
        document.head.removeChild(script)
      } catch (e) {
        // Script may already be removed
      }
    }
  }, [])

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center shadow-lg">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                Heizungs<span className="text-brand-green">rechner</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Berechnen Sie in wenigen Schritten die optimale Heizungslösung für Ihr Zuhause.
              Unser Heizungsrechner hilft Ihnen, die passende Technologie und die zu erwartenden Kosten zu ermitteln.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Heizungsrechner Widget */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-10"
          >
            <div
              id="meister1_LL-1774529252295-6424-64049-69579-CL"
              ref={containerRef}
              className="min-h-[600px]"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
