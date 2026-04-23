'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare, FileText } from 'lucide-react'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    const subject = encodeURIComponent(formData.subject || 'Kontaktanfrage von der Website')
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `E-Mail: ${formData.email}\n` +
      `Telefon: ${formData.phone || 'Nicht angegeben'}\n\n` +
      `Nachricht:\n${formData.message}`
    )
    window.location.href = `mailto:info@haustechnik-bielmeier.de?subject=${subject}&body=${body}`
    setSubmitStatus('success')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e?.target ?? {}
    setFormData((prev) => ({ ...prev, [name ?? '']: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Name *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
            placeholder="Ihr vollständiger Name"
          />
        </div>
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            E-Mail *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
              placeholder="ihre@email.de"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Telefon (optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
              placeholder="+49 ..."
            />
          </div>
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
          Betreff *
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FileText className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData?.subject}
            onChange={handleChange}
            required
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
            placeholder="Worum geht es?"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Nachricht *
        </label>
        <div className="relative">
          <div className="absolute top-3 left-0 pl-4 pointer-events-none">
            <MessageSquare className="w-5 h-5 text-gray-400" />
          </div>
          <textarea
            id="message"
            name="message"
            value={formData?.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all resize-none"
            placeholder="Beschreiben Sie Ihr Anliegen..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-brand-green text-white rounded-lg hover:bg-brand-green-dark transition-all font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Wird gesendet...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Nachricht senden</span>
            </>
          )}
        </button>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3"
        >
          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">Vielen Dank für Ihre Nachricht!</h4>
            <p className="text-green-700 text-sm">
              Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
            </p>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-red-200 rounded-lg flex items-start space-x-3"
        >
          <AlertCircle className="w-6 h-6 text-brand-green flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900">Fehler beim Senden</h4>
            <p className="text-brand-green-dark text-sm">
              {errorMessage || 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center">
        Ihre Daten werden vertraulich behandelt und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.
      </p>
    </form>
  )
}
