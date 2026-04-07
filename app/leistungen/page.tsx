'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Wrench, Droplets, Wind, Settings, CheckCircle, ArrowRight, Sun, Flame, Zap } from 'lucide-react'
import { ServiceCard } from '@/components/service-card'

const services = [
  {
    id: 'waermepumpe',
    icon: Zap,
    title: 'Wärmepumpe',
    description: 'Effiziente und umweltfreundliche Heizung mit Wärmepumpen-Technologie',
    image: '/bild5.avif',
    externalLink: 'https://www.viessmann.de/de/wissen/technik-und-systeme/waermepumpe.html',
    buttonText: 'Mehr bei Viessmann',
    details: [
      'Luft-Wasser-Wärmepumpen',
      'Sole-Wasser-Wärmepumpen (Erdwärme)',
      'Wasser-Wasser-Wärmepumpen',
      'Brauchwasser-Wärmepumpen',
      'Kompatibel mit Fußbodenheizungen und Heizkörpern dank Vorlauftemperaturen bis 70°C',
      'Festpreisangebot ohne versteckte Kosten inkl. aller erforderlichen Arbeiten (auch Erd-, Fundament- und Elektroarbeiten)',
      'Hydraulischer Abgleich',
      'Smart-Home-Integration',
      'Wartung und Service',
    ],
    benefits: [
      'Hohe Betriebskostenersparnis gegenüber konventionellen Heizsystemen',
      'Attraktive Fördersätze durch die KFW bis zu 70% der Investitionskosten',
      'CO₂-neutrale Heizung mit Ökostrom',
      'Kühlfunktion im Sommer möglich',
    ],
  },
  {
    id: 'pellet-holz',
    icon: Flame,
    title: 'Pellet-, Holz- und Hackschnitzelheizungen',
    description: 'Nachhaltige Heizlösungen mit nachwachsenden Rohstoffen – mit unseren Partnern Viessmann und Fröling',
    image: '/bild19.jpg',
    imageContain: true,
    imageBg: 'bg-gray-100',
    externalLink: 'https://www.froeling.com/de-de/',
    buttonText: 'Mehr bei Fröling',
    details: [
      'Pelletkessel und Pelletöfen',
      'Stückholzkessel',
      'Hackschnitzelheizungen',
      'Kombination mit Pufferspeicher',
      'Automatische Brennstoffzufuhr',
      'Förderschnecken und Saugsysteme',
      'Aschebehälter und Reinigung',
      'Schornsteinanpassung',
    ],
    benefits: [
      'CO₂-neutrales Heizen',
      'Unabhängigkeit von fossilen Brennstoffen',
      'Attraktive Fördersätze durch die KFW bis zu 70% der Investitionskosten',
      'Regionale Brennstoffbeschaffung',
    ],
  },
  {
    id: 'hybrid',
    icon: Wrench,
    title: 'Hybrid-Anlagen',
    description: 'Intelligente Kombination verschiedener Heizsysteme für maximale Effizienz',
    image: '/bild20.png',
    imageContain: true,
    imageBg: 'bg-white',
    externalLink: 'https://www.viessmann.de/de/wissen/technik-und-systeme/hybridheizung.html',
    buttonText: 'Mehr bei Viessmann',
    details: [
      'Wärmepumpe + Gas oder Öl',
      'Wärmepumpe + Pelletkessel',
      'Wärmepumpe + Solar',
      'Intelligente Steuerung',
      'Automatische Umschaltung (ökologische oder ökonomische Regelstrategie)',
      'Optimierung nach Energiepreisen',
      'Integration bestehender Systeme',
      'Zukunftssichere Heizlösung',
    ],
    benefits: [
      'Kombination mit Bestandskesseln jeder Art und jeden Fabrikats möglich',
      'Maximale Effizienz durch Systemkombination',
      'Niedrigste Betriebskosten',
      'Hohe Versorgungssicherheit',
      'Schrittweise Modernisierung möglich',
    ],
  },
  {
    id: 'sanitaer',
    icon: Droplets,
    title: 'Sanitärinstallation',
    description: 'Komplette Sanitärlösungen vom Bad bis zur Regenwassernutzung',
    image: 'https://cdn.abacus.ai/images/8d2246a4-f5e5-4283-bf41-4cff34f4c8ed.png',
    details: [
      'Badplanung und -sanierung',
      'Moderne Armaturen und Duschsysteme',
      'Waschtische und WC-Anlagen',
      'Trinkwasserinstallation',
      'Abwassertechnik',
      'Regenwassernutzung',
      'Wasserenthärtungsanlagen',
      'Sanitär-Notdienst',
    ],
    benefits: [
      'Barrierefreie Badlösungen',
      'Wassersparende Technologien',
      'Hochwertige Markengeräte',
      'Fachgerechte Installation nach DIN-Normen',
    ],
  },
  {
    id: 'klima',
    icon: Wind,
    title: 'Klimatechnik',
    description: 'Angenehmes Raumklima das ganze Jahr über',
    image: '/bild3.png',
    externalLink: 'https://www.carrier.de/de/produkte/klimaanlage.html',
    buttonText: 'Mehr bei Carrier',
    details: [
      'Split-Klimaanlagen',
      'Multi-Split-Systeme',
      'Zentrale Wohnraumlüftung mit Wärmerückgewinnung',
      'Dezentrale Lüftungsanlagen',
      'Klimaanlagen-Wartung',
      'Kältemittel-Service',
      'Luftqualitätsmessung',
      'Pollenfilter und Luftreinigung',
    ],
    benefits: [
      'Energieeffiziente Kälte- und Heiztechnik',
      'Bis zu 95% Wärmerückgewinnung',
      'Verbesserung der Luftqualität',
      'Leiser Betrieb für maximalen Komfort',
    ],
  },
  {
    id: 'pv',
    icon: Sun,
    title: 'PV-Anlagen inkl. Speicher und Wallbox',
    description: 'Komplette Photovoltaik-Lösungen für Ihre Energieunabhängigkeit',
    image: '/bild11.avif',
    externalLink: 'https://www.viessmann.de/de/produkte/energiemanagement/vitocharge-vx3.html',
    buttonText: 'Mehr bei Viessmann',
    details: [
      'Photovoltaik-Anlagen',
      'Batteriespeicher',
      'Wallboxen für E-Autos',
      'Energiemanagement-Systeme',
      'Netzeinspeisung',
      'Eigenverbrauchsoptimierung',
      'Monitoring und Fernwartung',
      'Anmeldung beim Netzbetreiber',
    ],
    benefits: [
      'Bis zu 80% Stromkosten sparen',
      'Unabhängigkeit vom Stromnetz',
      'E-Auto günstig laden',
      'Attraktive Förderungen möglich',
    ],
  },
  {
    id: 'wartung',
    icon: Settings,
    title: 'Wartung & Service',
    description: 'Regelmäßige Wartung für lange Lebensdauer und Effizienz',
    details: [
      'Heizungswartung',
      'Sanitär-Wartung',
      'Klimaanlagen-Wartung',
      'Störungsbehebung',
      'Notdienst',
      'Fernwartung',
      'Inspektionen nach BAFA-Vorgaben',
      'Wartungsverträge',
    ],
    benefits: [
      'Verlängerte Lebensdauer Ihrer Anlagen',
      'Niedrigere Betriebskosten',
      'Sicherheit durch regelmäßige Prüfung',
      'Vorrang bei Notfällen für Vertragskunden',
    ],
  },
]

export default function LeistungenPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Unsere <span className="text-brand-green">Leistungen</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Von der Planung über die Installation bis zur regelmäßigen Wartung –
              als Viessmann System Profi bieten wir Ihnen umfassende Lösungen
              für Heizung, Sanitär und Klimatechnik aus einer Hand.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services?.map?.((service, index) => (
            <ServiceCard key={service?.id} service={service} index={index} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-green to-brand-green-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Interesse an unseren Leistungen?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-green rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg shadow-xl hover:scale-105 transform"
            >
              Jetzt Kontakt aufnehmen
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
