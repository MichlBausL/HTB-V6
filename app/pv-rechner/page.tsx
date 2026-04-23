'use client'

import { useEffect, useRef } from 'react'
import { Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PvRechnerPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current) return
    scriptLoadedRef.current = true

    const licenceCode = 'LL-1774529252295-6424-64049-69579-CL'
    const selector = '#meister1_LL-1774529252295-6424-64049-69579-CL'

    const initWidget = () => {
      if (typeof (window as any).Lokalleads !== 'undefined') {
        ;(window as any).Lokalleads.init(licenceCode, { selector })
      }
    }

    // Check if script is already loaded (shared across rechner pages)
    const existingScript = document.querySelector(
      'script[src="https://offerio.meister1.com/init.js"]'
    ) as HTMLScriptElement | null

    let script: HTMLScriptElement | null = null

    if (existingScript) {
      if (typeof (window as any).Lokalleads !== 'undefined') {
        initWidget()
      } else {
        existingScript.addEventListener('load', initWidget)
      }
    } else {
      script = document.createElement('script')
      script.src = 'https://offerio.meister1.com/init.js'
      script.type = 'text/javascript'
      script.async = true
      script.onload = initWidget
      document.head.appendChild(script)
    }

    return () => {
      // Do not remove the shared meister1 script on unmount.
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
                <Sun className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">
                PV-<span className="text-brand-green">Rechner</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Berechnen Sie in wenigen Schritten Ihr individuelles Photovoltaik-Potenzial.
              Unser PV-Rechner hilft Ihnen, die passende Anlagengröße, den möglichen Stromertrag
              und Ihre Einsparungen zu ermitteln.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PV-Rechner Widget */}
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
