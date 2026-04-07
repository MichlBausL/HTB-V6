'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, User, Mail, Phone, MessageSquare, FileText } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const subject = encodeURIComponent(formData.subject || 'Kontaktanfrage von der Website')
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `E-Mail: ${formData.email}\n` +
      `Telefon: ${formData.phone || 'Nicht angegeben'}\n\n` +
      `Nachricht:\n${formData.message}`
    )
    window.location.href = `mailto:info@haustechnik-bielmeier.de?subject=${subject}&body=${body}`
    setSubmitStatus('success')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-brand-green" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Vielen Dank!</h3>
        <p className="text-gray-600 mb-4">
          Ihr E-Mail-Programm sollte sich geöffnet haben. Bitte senden Sie die E-Mail ab.
        </p>
        <p className="text-sm text-gray-500">
          Falls sich kein E-Mail-Programm geöffnet hat, senden Sie Ihre Anfrage direkt an:<br/>
          <a href="mailto:info@haustechnik-bielmeier.de" className="text-brand-green font-semibold">
            info@haustechnik-bielmeier.de
          </a>
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="mt-6 text-brand-green hover:underline"
        >
          Neue Nachricht senden
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Nachricht <span className="text-brand-green">senden</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4" />
            Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
            placeholder="Ihr Name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              E-Mail *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
              placeholder="ihre@email.de"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4" />
              Telefon
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
              placeholder="Ihre Telefonnummer"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4" />
            Betreff *
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
          >
            <option value="">Bitte wählen...</option>
            <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
            <option value="Heizungsberatung">Heizungsberatung</option>
            <option value="Wärmepumpe">Wärmepumpe</option>
            <option value="Photovoltaik">Photovoltaik</option>
            <option value="Sanitär">Sanitär</option>
            <option value="Wartung">Wartung</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4" />
            Nachricht *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all resize-none"
            placeholder="Wie können wir Ihnen helfen?"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Nachricht senden
        </button>

        <p className="text-sm text-gray-500 text-center">
          Ihr E-Mail-Programm öffnet sich automatisch mit Ihrer Nachricht.
        </p>
      </form>
    </motion.div>
  )
}
