'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle } from 'lucide-react'

interface Specialization {
  id: string
  title: string
  shortDesc: string
  description: string
  image: string
  features: string[]
  benefits: string[]
  featured: boolean
}

interface SpecializationGridProps {
  specializations: Specialization[]
}

export function SpecializationGrid({ specializations }: SpecializationGridProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <div ref={ref} className="space-y-20">
      {specializations?.map?.((spec, index) => {
        const isEven = index % 2 === 0

        return (
          <motion.div
            key={spec?.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            id={spec?.id}
            className="scroll-mt-24"
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}
            >
              {/* Image */}
              <div className={`relative ${isEven ? '' : 'lg:col-start-2'}`}>
                <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={spec?.image ?? ''}
                    alt={spec?.title ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {spec?.featured && (
                  <div className="absolute -top-4 -right-4 bg-brand-green text-white px-6 py-2 rounded-full font-bold shadow-lg">
                    Schwerpunkt
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {spec?.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {spec?.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Leistungsumfang:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {spec?.features?.slice(0, 6)?.map?.((feature) => (
                      <div key={feature} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  {(spec?.features?.length ?? 0) > 6 && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {spec?.features?.slice(6)?.map?.((feature) => (
                        <div key={feature} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-brand-green/20">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-brand-green rounded-full mr-2"></span>
                    Ihre Vorteile:
                  </h3>
                  <ul className="space-y-2">
                    {spec?.benefits?.map?.((benefit) => (
                      <li key={benefit} className="flex items-start space-x-2">
                        <span className="text-brand-green font-bold text-lg">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
