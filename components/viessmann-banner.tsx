'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Shield, Wrench, Zap } from 'lucide-react'

export function ViessmannBanner() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const benefits = [
    {
      icon: Award,
      title: 'Zertifizierte Expertise',
      description: 'Als Viessmann System Profi bieten wir höchste Qualität',
    },
    {
      icon: Zap,
      title: 'Integrierte Lösungen',
      description: 'Perfekt aufeinander abgestimmte Systemtechnik',
    },
    {
      icon: Wrench,
      title: 'Schneller Service',
      description: 'Von der Planung bis zur Wartung aus einer Hand',
    },
    {
      icon: Shield,
      title: 'Langjährige Garantie',
      description: 'Verlässlicher Partner für Ihre Haustechnik',
    },
  ]

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ihr zertifizierter <span style={{ color: '#E53900' }}>Viessmann System Profi</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Als zertifizierter Viessmann System Profi garantieren wir Ihnen höchste Qualitätsstandards
            und ganzheitliche Energielösungen für Ihr Zuhause.
          </p>
          
          {/* Viessmann Image */}
          <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl mb-12 bg-gray-100">
            <Image
              src="/bild18.avif"
              alt="Viessmann Systemlösungen"
              width={1200}
              height={800}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits?.map?.((benefit, index) => {
            const Icon = benefit?.icon
            return (
              <motion.div
                key={benefit?.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-6 h-6 text-brand-green" />}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit?.title}</h3>
                <p className="text-gray-600 text-sm">{benefit?.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
