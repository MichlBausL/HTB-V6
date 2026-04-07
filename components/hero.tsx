'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail, CheckCircle, Smartphone } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-gray-200">
          <Image
            src="/bild2.jpg"
            alt="Moderne Haustechnik"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a 
              href="https://www.viessmann.de/de/services/system-profi.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-64 h-12 mb-6 hover:scale-105 transition-transform"
            >
              <Image
                src="/bild14.png"
                alt="Viessmann System Profi"
                fill
                className="object-contain object-left"
                sizes="256px"
              />
            </a>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Moderne Haustechnik
              <br />
              <span className="text-brand-green">mit System</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Professionelle Lösungen für Heizung, Sanitär und Klimatechnik in Viechtach und Umgebung.
              Energieeffizient, nachhaltig und zukunftssicher.
            </p>

            {/* Trust Elements */}
            <div className="flex flex-wrap gap-4 mb-10">
              {[
                'Wärmepumpen Experte',
                'Viessmann Partner',
                'Alles aus einer Hand',
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2 text-white">
                  <CheckCircle className="w-5 h-5 text-brand-green" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <Link
                href="/beratung"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <Mail className="w-5 h-5 mr-2" />
                Beratungsgutschein
              </Link>
              <a
                href="tel:+4999424650198"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <Phone className="w-5 h-5 mr-2" />
                +49 9942 4650198
              </a>
              <a
                href="tel:+4916099118545"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                +49 160 99118545
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
