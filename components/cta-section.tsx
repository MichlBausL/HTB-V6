'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, MessageSquare } from 'lucide-react'

export function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-brand-green to-brand-green-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bereit für Ihre neue Haustechnik?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-95">
            Kontaktieren Sie uns für eine unverbindliche Beratung.
            Wir freuen uns darauf, Ihr Projekt zu realisieren!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-green rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Kontaktformular
            </Link>
            <a
              href="tel:+4999424650198"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
            >
              <Phone className="w-5 h-5 mr-2" />
              Jetzt anrufen
            </a>
            <a
              href="mailto:info@haustechnik-bielmeier.de"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all font-semibold text-lg border-2 border-white/30 hover:border-white/50"
            >
              <Mail className="w-5 h-5 mr-2" />
              E-Mail senden
            </a>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 pt-12 border-t border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Phone className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Telefon</div>
                <a href="tel:+4999424650198" className="hover:underline">
                  +49 9942 4650198
                </a>
              </div>
              <div>
                <Mail className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">E-Mail</div>
                <a href="mailto:info@haustechnik-bielmeier.de" className="hover:underline">
                  info@haustechnik-bielmeier.de
                </a>
              </div>
              <div>
                <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                <div className="font-semibold">Öffnungszeiten</div>
                <div>Mo-Fr: 8:00 - 17:00 Uhr</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
