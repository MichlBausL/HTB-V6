import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Smartphone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="relative h-12 w-[180px] mb-4 bg-white rounded px-2 py-1">
              <Image
                src="/bild16.png"
                alt="Bielmeier - Heizung | Lüftung | Sanitär"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm mb-4">
              Ihr <span className="text-brand-green font-semibold">Partner</span> für
              moderne Haustechnik in Viechtach und Umgebung.
            </p>
            <p className="text-sm">
              Michael Bielmeier
              <br />
              Heizung | Lüftung | Sanitär
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <div>
                  Pirka 2<br />
                  94234 Viechtach
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-green flex-shrink-0" />
                <a href="tel:+4999424650198" className="hover:text-white transition-colors">
                  +49 9942 4650198
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-brand-green flex-shrink-0" />
                <a href="tel:+4916099118545" className="hover:text-white transition-colors">
                  +49 160 99118545
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-green flex-shrink-0" />
                <a href="mailto:info@haustechnik-bielmeier.de" className="hover:text-white transition-colors">
                  info@haustechnik-bielmeier.de
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <div>
                  Mo-Fr: 8:00 - 17:00 Uhr<br />
                  Termine nach Vereinbarung
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Schnelllinks</h4>
            <div className="space-y-2 text-sm">
              <Link href="/leistungen" className="block hover:text-white transition-colors">
                Leistungen
              </Link>
              <Link href="/spezialisierungen" className="block hover:text-white transition-colors">
                Spezialisierungen
              </Link>
              <Link href="/kontakt" className="block hover:text-white transition-colors">
                Kontakt aufnehmen
              </Link>
              <Link href="/impressum" className="block hover:text-white transition-colors">
                Impressum
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>
            &copy; {new Date()?.getFullYear?.()} Bielmeier Haustechnik. Alle Rechte vorbehalten.
          </p>
          <p className="mt-2 text-gray-500">
            Ihr Partner für moderne Haustechnik
          </p>
        </div>
      </div>
    </footer>
  )
}
