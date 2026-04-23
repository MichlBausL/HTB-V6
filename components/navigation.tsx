'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/spezialisierungen', label: 'Spezialisierungen' },
  { href: '/heizungsrechner', label: 'Heizungsrechner' },
  { href: '/pv-rechner', label: 'PV-Rechner' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window?.scrollY > 20)
    }
    window?.addEventListener?.('scroll', handleScroll)
    return () => window?.removeEventListener?.('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-14 w-[200px] sm:w-[240px]">
              <Image
                src="/bild16.png"
                alt="Bielmeier - Heizung | Lüftung | Sanitär"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks?.map?.((link) => (
              <Link
                key={link?.href}
                href={link?.href ?? '/'}
                className="px-4 py-2 text-gray-700 hover:text-brand-green transition-colors font-medium rounded-lg hover:bg-gray-50"
              >
                {link?.label}
              </Link>
            ))}
            <a
              href="tel:+4999424650198"
              className="ml-4 px-6 py-2.5 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors font-medium flex items-center space-x-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Anrufen</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menü"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks?.map?.((link) => (
                <Link
                  key={link?.href}
                  href={link?.href ?? '/'}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-brand-green hover:bg-gray-50 rounded-lg transition-colors font-medium"
                >
                  {link?.label}
                </Link>
              ))}
              <a
                href="tel:+4999424650198"
                className="block px-4 py-3 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-colors font-medium text-center"
              >
                <Phone className="w-4 h-4 inline mr-2" />
                Jetzt anrufen
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
