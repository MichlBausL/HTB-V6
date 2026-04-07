'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, Battery, Sun, Plug } from 'lucide-react'

const specializations = [
  {
    icon: Zap,
    title: 'Wärmepumpen',
    description: 'Effiziente Wärmepumpen für Neubau und Sanierung',
    image: '/bild5.avif',
    featured: true,
  },
  {
    icon: Sun,
    title: 'Photovoltaik',
    description: 'Solarstrom für Ihr Zuhause',
    image: '/bild11.avif',
    featured: false,
  },
  {
    icon: Battery,
    title: 'Stromspeicher',
    description: 'Energie speichern und nutzen',
    image: '/bild7.avif',
    featured: false,
  },
  {
    icon: Plug,
    title: 'Wallbox',
    description: 'E-Auto zuhause laden',
    image: '/bild8.avif',
    featured: false,
  },
]

export function SpecializationsPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Unsere <span className="text-brand-green">Spezialisierungen</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Zukunftssichere Energielösungen für Ihr Zuhause.
            Effizient, nachhaltig und perfekt aufeinander abgestimmt.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specializations?.map?.((spec, index) => {
            const Icon = spec?.icon
            return (
              <motion.div
                key={spec?.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl ${
                  spec?.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <Link
                  href="/spezialisierungen"
                  className="block h-full"
                >
                  {/* Background Image */}
                  <div className="relative h-80 bg-gray-700">
                    <Image
                      src={spec?.image ?? ''}
                      alt={spec?.title ?? ''}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes={spec?.featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center mb-4">
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-green transition-colors">
                      {spec?.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {spec?.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/spezialisierungen"
            className="inline-flex items-center px-8 py-4 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-all font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            Alle Spezialisierungen entdecken
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
