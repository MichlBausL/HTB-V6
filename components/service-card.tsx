'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CheckCircle, ExternalLink, type LucideIcon } from 'lucide-react'

interface Service {
  id: string
  icon: LucideIcon
  title: string
  description: string
  image?: string
  imageContain?: boolean
  imageBg?: string
  externalLink?: string
  buttonText?: string
  details: string[]
  benefits: string[]
}

interface ServiceCardProps {
  service: Service
  index: number
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const isEven = index % 2 === 0
  const Icon = service?.icon
  const hasImage = !!service?.image
  const hasExternalLink = !!service?.externalLink

  return (
    <div ref={ref} id={service?.id} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={hasImage ? `grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:grid-flow-dense'}` : ''}
      >
        {/* Image - nur anzeigen wenn vorhanden */}
        {hasImage && (
          <div className={`relative ${isEven ? '' : 'lg:col-start-2'}`}>
            {hasExternalLink ? (
              <a 
                href={service.externalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-xl ${service.imageBg || 'bg-gray-200'} transition-transform group-hover:scale-[1.02]`}>
                  <Image
                    src={service.image!}
                    alt={service?.title ?? ''}
                    fill
                    className={service.imageContain ? "object-contain p-4" : "object-cover"}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-lg text-gray-800 font-medium flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> Mehr erfahren
                    </span>
                  </div>
                </div>
              </a>
            ) : (
              <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-xl ${service.imageBg || 'bg-gray-200'}`}>
                <Image
                  src={service.image!}
                  alt={service?.title ?? ''}
                  fill
                  className={service.imageContain ? "object-contain p-4" : "object-cover"}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center shadow-xl">
              {Icon && <Icon className="w-8 h-8 text-white" />}
            </div>
            
            {/* External Link Button */}
            {hasExternalLink && (
              <div className="mt-8 text-center">
                <a
                  href={service.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors font-semibold shadow-lg hover:shadow-xl"
                >
                  {service.buttonText || 'Mehr Informationen'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={hasImage ? (isEven ? '' : 'lg:col-start-1 lg:row-start-1') : 'max-w-3xl mx-auto'}>
          <div className="flex items-center gap-4 mb-4">
            {!hasImage && Icon && (
              <div className="w-14 h-14 bg-brand-green rounded-2xl flex items-center justify-center shadow-lg">
                <Icon className="w-7 h-7 text-white" />
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {service?.title}
            </h2>
          </div>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {service?.description}
          </p>

          {/* Details */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Unsere Leistungen:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service?.details?.map?.((detail) => (
                <div key={detail} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Ihre Vorteile:</h3>
            <ul className="space-y-2">
              {service?.benefits?.map?.((benefit) => (
                <li key={benefit} className="flex items-start space-x-2">
                  <span className="text-brand-green font-bold">•</span>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
