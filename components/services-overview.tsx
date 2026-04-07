'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Wrench, Droplets, Wind, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Heizungsinstallation',
    description: 'Moderne Wärmepumpen, Gasheizungen und Pelletkessel. Energieeffiziente Lösungen für Neubau und Sanierung.',
    image: '/bild1.jpg',
    link: '/leistungen#heizung',
  },
  {
    icon: Droplets,
    title: 'Sanitärinstallation',
    description: 'Professionelle Sanitärarbeiten von der Badplanung bis zur kompletten Installation. Modern und zuverlässig.',
    image: 'https://cdn.abacus.ai/images/8d2246a4-f5e5-4283-bf41-4cff34f4c8ed.png',
    link: '/leistungen#sanitaer',
  },
  {
    icon: Wind,
    title: 'Klimatechnik',
    description: 'Klimaanlagen und zentrale Wohnraumlüftung für optimales Raumklima. Effizient und leise.',
    image: '/bild3.png',
    link: '/leistungen#klima',
  },
]

export function ServicesOverview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unsere <span className="text-brand-green">Leistungen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der Planung über die Installation bis zur regelmäßigen Wartung –
            wir sind Ihr zuverlässiger Partner für alle Belange der Haustechnik.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services?.map?.((service, index) => {
            const Icon = service?.icon
            return (
              <motion.div
                key={service?.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={service?.link ?? '/leistungen'}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative aspect-video bg-gray-200">
                    <Image
                      src={service?.image ?? ''}
                      alt={service?.title ?? ''}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center">
                      {Icon && <Icon className="w-6 h-6 text-white" />}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brand-green transition-colors">
                      {service?.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service?.description}
                    </p>
                    <div className="flex items-center text-brand-green font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Mehr erfahren</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
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
            href="/leistungen"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Alle Leistungen ansehen
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
