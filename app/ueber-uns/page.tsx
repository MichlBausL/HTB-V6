'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Users, Wrench, Heart, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react'

const values = [
  {
    icon: Award,
    title: 'Qualität',
    description: 'Höchste Standards bei Planung, Installation und Wartung',
  },
  {
    icon: Shield,
    title: 'Zuverlässigkeit',
    description: 'Termintreue und langfristige Partnerschaft',
  },
  {
    icon: Heart,
    title: 'Kundennähe',
    description: 'Individuelle Beratung und maßgeschneiderte Lösungen',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Modernste Technik für nachhaltige Energielösungen',
  },
]

const milestones = [
  {
    year: 'Seit Gründung',
    title: 'Fachbetrieb',
    description: 'Handwerksqualität auf höchstem Niveau',
  },
  {
    year: 'Heute',
    title: 'Viessmann System Profi',
    description: 'Zertifizierter Partner für integrierte Systemlösungen',
  },
  {
    year: 'Zukunft',
    title: 'Ihr Partner',
    description: 'Für nachhaltige und effiziente Haustechnik',
  },
]

const expertise = [
  'Wärmepumpen-Spezialist',
  'Viessmann System Profi',
  'PV-Fachbetrieb',
  'Klimatechnik-Experte',
  'Sanitär-Fachbetrieb',
]

export default function UeberUnsPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [milestonesRef, milestonesInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [viessmannRef, viessmannInView] = useInView({ triggerOnce: true, threshold: 0.1 })

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Über <span className="text-brand-green">uns</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Haustechnik Bielmeier steht für professionelle Haustechnik-Lösungen in Viechtach
              und Umgebung. Als Viessmann System Profi sind wir Ihr verlässlicher Partner für
              moderne, energieeffiziente und nachhaltige Gebäudetechnik.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section - ohne Bild */}
      <section ref={heroRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              Ihr <span className="text-brand-green">Fachbetrieb</span> in Viechtach
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                Michael Bielmeier führt den Fachbetrieb Haustechnik Bielmeier mit
                Leidenschaft und Fachkompetenz. Mit langjähriger Erfahrung und kontinuierlicher
                Weiterbildung garantieren wir höchste Qualität bei allen Projekten.
              </p>
              <p>
                Als zertifizierter <strong className="text-brand-green">Viessmann System Profi</strong> haben
                wir uns auf integrierte Energielösungen spezialisiert. Von der Wärmepumpe über
                Photovoltaik bis zur intelligenten Gebäudesteuerung – wir bieten Ihnen
                Systemlösungen aus einer Hand.
              </p>
              <p>
                Unser Fokus liegt auf <strong>nachhaltigen und zukunftssicheren Lösungen</strong>,
                die nicht nur die Umwelt schonen, sondern auch Ihre Energiekosten nachhaltig senken.
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {expertise?.map?.((item) => (
                <div
                  key={item}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Unsere <span className="text-brand-green">Werte</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Was uns antreibt und auszeichnet
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values?.map?.((value, index) => {
              const Icon = value?.icon
              return (
                <motion.div
                  key={value?.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {Icon && <Icon className="w-8 h-8 text-brand-green" />}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value?.title}</h3>
                  <p className="text-gray-600">{value?.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Viessmann System Profi Section - mit bild9 und bild10 */}
      <section ref={viessmannRef} className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={viessmannInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* System Profi Logo */}
            <div className="flex justify-center mb-6">
              <a 
                href="https://www.viessmann.de/de/services/system-profi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-80 h-40 hover:scale-105 transition-transform"
              >
                <Image
                  src="/bild15.png"
                  alt="Viessmann System Profi"
                  fill
                  className="object-contain"
                  sizes="320px"
                />
              </a>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Was bedeutet <span style={{ color: '#E53900' }}>Viessmann System Profi</span>?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Als zertifizierter Viessmann System Profi erfüllen wir höchste Qualitätsstandards
              und bieten Ihnen umfassende Expertise für integrierte Energielösungen.
            </p>
          </motion.div>

          {/* ONE BASE Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={viessmannInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl mb-12 bg-white"
          >
            <Image
              src="/bild10.avif"
              alt="Viessmann ONE BASE - Alle Komponenten aus einer Hand"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1280px) 100vw, 1024px"
            />
          </motion.div>

          {/* Vorteile Liste */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={viessmannInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {[
              'Umfassende Beratung von der Planung bis zur Wartung',
              'Integrierte Systemlösungen aus Wärmepumpe, PV und Speicher',
              'Schneller Service und Angebotserstellung',
              'Ganzheitliche Lösungen für moderne Gebäudetechnik',
              'Zertifizierte Expertise in Viessmann-Systemtechnologie',
              'Direkter Zugriff auf technischen Support',
            ].map((item) => (
              <div key={item} className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-brand-green flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Milestones */}
      <section ref={milestonesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={milestonesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Unser <span className="text-brand-green">Weg</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milestones?.map?.((milestone, index) => (
              <motion.div
                key={milestone?.year}
                initial={{ opacity: 0, y: 30 }}
                animate={milestonesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {milestone?.year}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone?.title}</h3>
                <p className="text-gray-600">{milestone?.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-green to-brand-green-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Lernen Sie uns kennen!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Wir freuen uns darauf, auch Ihr Projekt zu realisieren.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-green rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl hover:scale-105 transform"
            >
              Kontakt aufnehmen
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="tel:+4999424650198"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold text-lg shadow-xl hover:scale-105 transform"
            >
              +49 9942 4650198
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
