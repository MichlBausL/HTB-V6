import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | Bielmeier Haustechnik',
  description: 'Impressum und rechtliche Informationen zu Bielmeier Haustechnik',
}

export default function ImpressumPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            <span className="text-brand-green">Impressum</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-gray-700 mb-6">
              Haustechnik Bielmeier<br />
              Inhaber: Michael Bielmeier<br />
              Heizung | Lüftung | Sanitär<br />
              Pirka 2<br />
              94234 Viechtach
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Kontakt</h2>
            <p className="text-gray-700 mb-6">
              Telefon: +49 9942 4650198<br />
              Mobil: +49 160 99118545<br />
              E-Mail: info@haustechnik-bielmeier.de
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Umsatzsteuer-ID</h2>
            <p className="text-gray-700 mb-6">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE282406617
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p className="text-gray-700 mb-6">
              Berufsbezeichnung: Installateur und Heizungsbaumeister<br />
              Zuständige Kammer: Handwerkskammer Niederbayern-Oberpfalz<br />
              Verliehen in: Deutschland
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">EU-Streitschlichtung</h2>
            <p className="text-gray-700 mb-6">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">
                https://ec.europa.eu/consumers/odr/
              </a><br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p className="text-gray-700 mb-6">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Haftung für Inhalte</h2>
            <p className="text-gray-700 mb-6">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter 
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen 
              oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="text-gray-700 mb-6">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen 
              Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt 
              der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden 
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Haftung für Links</h2>
            <p className="text-gray-700 mb-6">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Urheberrecht</h2>
            <p className="text-gray-700 mb-6">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem 
              deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung 
              außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen 
              Autors bzw. Erstellers.
            </p>

          </div>
        </div>
      </section>
    </div>
  )
}
