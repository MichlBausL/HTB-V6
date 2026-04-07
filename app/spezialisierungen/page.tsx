'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, CheckCircle, Zap, Sun, Battery, Plug, Smartphone, Thermometer, ExternalLink } from 'lucide-react'

const specializations = [
  {
    id: 'waermepumpe',
    icon: Zap,
    title: 'Wärmepumpen',
    shortDesc: 'Effiziente Wärmeerzeugung aus Umweltenergie',
    description: 'Wärmepumpen nutzen kostenlose Umweltenergie aus Luft, Wasser oder Erdreich und wandeln diese hocheffizient in Heizwärme um. Als ideale Lösung für Neubau und Sanierung bieten moderne Wärmepumpen Heizleistungen bei niedrigsten Betriebskosten.',
    image: '/bild5.avif',
    externalLink: 'https://www.viessmann.de/de/wissen/technik-und-systeme/waermepumpe.html',
    buttonText: 'Mehr bei Viessmann',
    features: [
      'Luft-Wasser-Wärmepumpen',
      'Sole-Wasser-Wärmepumpen',
      'Wasser-Wasser-Wärmepumpen',
      'Hybrid-Wärmepumpen',
      'Jahresarbeitszahlen bis 5,0',
      'Förderung bis zu 70% möglich',
      'Geeignet für Neubau und Bestand',
      'Heizen und Kühlen in einem System',
    ],
    featured: true,
  },
  {
    id: 'photovoltaik',
    icon: Sun,
    title: 'Photovoltaik',
    shortDesc: 'Eigenen Strom produzieren und sparen',
    description: 'Mit einer Photovoltaikanlage produzieren Sie Ihren eigenen Strom direkt auf dem Dach. In Kombination mit einem Stromspeicher und einer Wärmepumpe erreichen Sie höchste Unabhängigkeit und minimale Energiekosten.',
    image: '/bild11.avif',
    externalLink: 'https://www.viessmann.de/de/wissen/technik-und-systeme/photovoltaik.html',
    buttonText: 'Mehr bei Viessmann',
    features: [
      'Individuelle Anlagenplanung',
      'Hochleistungs-Solarmodule',
      'Leistungsoptimierte Wechselrichter',
      'Integration mit Stromspeicher',
      'Monitoring und Fernwartung',
      'Ertragsgarantie',
      'Komplette Installation',
      'Anmeldung beim Netzbetreiber',
    ],
    featured: false,
  },
  {
    id: 'stromspeicher',
    icon: Battery,
    title: 'Stromspeicher',
    shortDesc: 'Solarstrom speichern und rund um die Uhr nutzen',
    description: 'Solarstrom speichern und jederzeit nutzen – auch nachts und bei schlechtem Wetter. Moderne Batteriespeicher machen Sie noch unabhängiger vom Stromnetz.',
    image: '/bild7.avif',
    externalLink: 'https://www.viessmann.de/de/produkte/energiemanagement/vitocharge-vx3.html',
    buttonText: 'Mehr bei Viessmann',
    features: [
      'Lithium-Eisenphosphat-Zellen',
      'Modulare Speicherkapazität',
      'Intelligentes Energiemanagement',
      'Notstromfunktion',
      'Lange Lebensdauer (20+ Jahre)',
      'Integration mit PV und Wärmepumpe',
      'App-Steuerung',
      'Automatische Optimierung',
      'Perfekt auch zur Erweiterung von Bestandanlagen: Vorhandene Wechselrichter können ins Viessmann-Energiemanagement integriert werden',
    ],
    featured: false,
  },
  {
    id: 'wallbox',
    icon: Plug,
    title: 'Wallbox',
    shortDesc: 'Ihr E-Auto zuhause laden',
    description: 'Mit einer Wallbox laden Sie Ihr Elektroauto bequem und sicher zuhause. In Kombination mit Ihrer Photovoltaikanlage fahren Sie nahezu kostenlos und umweltfreundlich.',
    image: '/bild8.avif',
    externalLink: 'https://www.viessmann.de/de/produkte/energiemanagement/viessmann-charging-station.html',
    buttonText: 'Mehr bei Viessmann',
    features: [
      'Wallbox-Installation',
      'Lastmanagement',
      'Integration mit PV-Anlage',
      'Überschussladung',
      'App-Steuerung',
      'Verschiedene Ladeleistungen',
      'Abrechnungsfähig',
      'Förderung möglich',
    ],
    featured: false,
  },
  {
    id: 'energiemanagement',
    icon: Smartphone,
    title: 'Energiemanagementsystem',
    shortDesc: 'Intelligente Steuerung Ihrer gesamten Haustechnik',
    description: 'Mit dem Viessmann Home Energy Management System steuern Sie Wärmepumpe, Photovoltaik, Stromspeicher und Wallbox über eine einzige App – intelligent vernetzt für maximale Effizienz und Komfort.',
    image: '/bild22.png',
    externalLink: 'https://www.viessmann.de/de/loesungen/intelligente-technologie/energy-management.html',
    buttonText: 'Mehr bei Viessmann',
    features: [
      'Zentrale Steuerung aller Komponenten',
      'Intelligente Eigenverbrauchsoptimierung',
      'Echtzeit-Energiemonitoring',
      'Automatische Lastverteilung',
      'CO2-Bilanzierung',
      'Wetterprognose-Integration',
      'App-Steuerung von überall',
      'Automatischer hydraulischer Abgleich',
    ],
    featured: false,
  },
  {
    id: 'einzelraumregelung',
    icon: Thermometer,
    title: 'Intelligente Einzelraumregelung',
    shortDesc: 'ViCare Smart Climate für perfekte Wohlfühltemperatur',
    description: 'Die ViCare Einzelraumsteuerung sorgt für die perfekte Wohlfühltemperatur in jedem Raum – automatisch und ohne lästiges Nachregeln. Einmal eingestellt, regelt Smart Climate den Rest ganz automatisch, optimal abgestimmt mit Ihrer Heizung.',
    image: '/bild23.png',
    externalLink: 'https://www.viessmann.de/de/produkte/steuerung-und-konnektivitaet/vicare-app/komponenten.html',
    buttonText: 'Mehr bei Viessmann',
    features: [
      'Einsparungen bis zu 28% (Fraunhofer-Institut bestätigt)',
      'Automatischer hydraulischer Abgleich (TÜV-zertifiziert)',
      'Optimale Raumtemperatur in jedem Zimmer',
      'Komfortgewinn durch Zeitprogramme',
      'Erkennung offener Fenster',
      'Einfache Installation an allen Heizkörpern',
      'Intelligent Heat Control',
      'Optimierung der Vorlauftemperatur',
    ],
    featured: false,
  },
]

function SpecializationCard({ spec, index }: { spec: typeof specializations[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const Icon = spec.icon
  const isEven = index % 2 === 0
  const hasExternalLink = !!spec.externalLink

  return (
    <div ref={ref} id={spec.id} className="scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}
      >
        {/* Image */}
        <div className={`relative ${!isEven ? 'lg:col-start-2' : ''}`}>
          {hasExternalLink ? (
            <a 
              href={spec.externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-xl transition-transform group-hover:scale-[1.02]">
                <Image
                  src={spec.image}
                  alt={spec.title}
                  fill
                  className="object-cover"
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
            <div className="relative aspect-video bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={spec.image}
                alt={spec.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
          <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center shadow-xl">
            <Icon className="w-8 h-8 text-white" />
          </div>
          
          {/* External Link Button */}
          {hasExternalLink && (
            <div className="mt-8 text-center">
              <a
                href={spec.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors font-semibold shadow-lg hover:shadow-xl"
              >
                {spec.buttonText || 'Mehr Informationen'}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {spec.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {spec.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {spec.features.map((feature) => (
              <div key={feature} className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function SpezialisierungenPage() {
  const [oneBaseRef, oneBaseInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Unsere <span className="text-brand-green">Spezialisierungen</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Zukunftssichere Energielösungen für Ihr Zuhause. Als Viessmann System Profi
              bieten wir integrierte Systemlösungen aus Heizung, Photovoltaik, Speicher und Wallbox –
              perfekt aufeinander abgestimmt und alles aus einer Hand.
            </p>
          </div>
        </div>
      </section>

      {/* Alles aus einer Hand - ONE BASE */}
      <section ref={oneBaseRef} className="py-16 bg-gradient-to-br from-gray-100 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={oneBaseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative w-80 h-24 mx-auto mb-4">
              <Image
                src="/bild21.png"
                alt="Viessmann ONE BASE"
                fill
                className="object-contain"
                sizes="320px"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Alles aus <span className="text-brand-green">einer Hand</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Mit dem Viessmann Home Energy Management System steuern Sie Wärmepumpe, Photovoltaik,
              Stromspeicher und Wallbox über eine einzige App – intelligent vernetzt und optimal aufeinander abgestimmt.
            </p>
          </motion.div>

          {/* ONE BASE Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={oneBaseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-5xl mx-auto mb-12"
          >
            <a 
              href="https://www.viessmann.de/de/loesungen/intelligente-technologie/viessmann-one-base.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-white transition-transform group-hover:scale-[1.01]">
                <Image
                  src="/bild10.avif"
                  alt="Viessmann ONE BASE - Home Energy Management System"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1280px) 100vw, 1024px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center rounded-2xl">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-lg text-gray-800 font-medium flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Mehr erfahren
                  </span>
                </div>
              </div>
            </a>
            <div className="mt-6 text-center">
              <a
                href="https://www.viessmann.de/de/loesungen/intelligente-technologie/viessmann-one-base.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors font-semibold shadow-lg hover:shadow-xl"
              >
                Mehr bei Viessmann
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Vorteile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={oneBaseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                title: 'Eine App für alles',
                description: 'Steuern Sie Wärmepumpe, PV, Speicher und Wallbox zentral über ViCare',
              },
              {
                title: 'Intelligentes Energiemanagement',
                description: 'Automatische Optimierung für maximalen Eigenverbrauch',
              },
              {
                title: 'Komplett-Service',
                description: 'Vom Fundament über Baggerarbeiten bis zum elektrischen Anschluss',
              },
              {
                title: 'Perfekte Abstimmung',
                description: 'Alle Komponenten von Viessmann arbeiten optimal zusammen',
              },
              {
                title: 'Zukunftssicher',
                description: 'Erweiterbar und kompatibel mit neuen Technologien',
              },
              {
                title: 'Ein Ansprechpartner',
                description: 'Wir kümmern uns um Planung, Installation und Wartung',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <CheckCircle className="w-8 h-8 text-brand-green mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {specializations.map((spec, index) => (
            <SpecializationCard key={spec.id} spec={spec} index={index} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-green to-brand-green-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interessiert an einer unserer Spezialisierungen?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Lassen Sie sich von uns individuell beraten. Wir finden die optimale Lösung für Ihr Projekt – alles aus einer Hand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-green rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl hover:scale-105 transform"
            >
              Beratung anfragen
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
