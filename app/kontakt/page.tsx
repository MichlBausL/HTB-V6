import { ContactForm } from '@/components/contact-form'
import { Phone, Mail, MapPin, Clock, Printer } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    content: ['Pirka 2', '94234 Viechtach'],
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: ['+49 9942 4650198'],
    link: 'tel:+4999424650198',
  },
  {
    icon: Phone,
    title: 'Mobil',
    content: ['+49 160 99118545'],
    link: 'tel:+4916099118545',
  },
  {
    icon: Printer,
    title: 'Fax',
    content: ['Wir leben im 21. Jahrhundert'],
  },
  {
    icon: Mail,
    title: 'E-Mail',
    content: ['info@haustechnik-bielmeier.de'],
    link: 'mailto:info@haustechnik-bielmeier.de',
  },
  {
    icon: Clock,
    title: 'Öffnungszeiten',
    content: ['Montag - Freitag: 7:00 - 17:00 Uhr', 'Termine nach Vereinbarung'],
  },
]

export default function KontaktPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-brand-green">Kontakt</span> aufnehmen
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Haben Sie Fragen zu unseren Leistungen oder möchten Sie ein konkretes Projekt besprechen?
              Wir freuen uns auf Ihre Nachricht und beraten Sie gerne!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Kontakt<span className="text-brand-green">informationen</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Erreichen Sie uns telefonisch, per E-Mail oder besuchen Sie uns direkt vor Ort.
                  Wir nehmen uns gerne Zeit für Ihre Anliegen.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo?.map?.((item) => {
                  const Icon = item?.icon
                  const content = item?.content

                  return (
                    <div key={item?.title} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {Icon && <Icon className="w-6 h-6 text-brand-green" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item?.title}</h3>
                        {item?.link ? (
                          <a
                            href={item?.link}
                            className="text-gray-600 hover:text-brand-green transition-colors"
                          >
                            {content?.map?.((line, idx) => (
                              <div key={idx}>{line}</div>
                            ))}
                          </a>
                        ) : (
                          <div className="text-gray-600">
                            {content?.map?.((line, idx) => (
                              <div key={idx}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Google Maps */}
              <div className="mt-8">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2612.5!2d12.8833!3d49.0833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPirka%202%2C%2094234%20Viechtach!5e0!3m2!1sde!2sde!4v1600000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Standort Haustechnik Bielmeier - Pirka 2, 94234 Viechtach"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Senden Sie uns eine <span className="text-brand-green">Nachricht</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Füllen Sie das folgende Formular aus und wir melden uns schnellstmöglich bei Ihnen zurück.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
