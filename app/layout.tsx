import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://haustechnik-bielmeier.de'),
  title: 'Bielmeier - Heizung | Lüftung | Sanitär | Viechtach',
  description: 'Bielmeier Haustechnik - Ihr Viessmann System Profi in Viechtach. Spezialisiert auf Wärmepumpen, Heizung, Lüftung, Sanitär, Photovoltaik und Klimatechnik. Professionelle Beratung und Installation.',
  keywords: 'Bielmeier, Haustechnik, Wärmepumpe, Heizung, Lüftung, Sanitär, Viechtach, Viessmann, Photovoltaik, Klimatechnik',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Bielmeier - Heizung | Lüftung | Sanitär',
    description: 'Ihr Experte für Wärmepumpen, Heizung, Lüftung, Sanitär und Photovoltaik in Viechtach',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
