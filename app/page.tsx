import { Hero } from '@/components/hero'
import { ServicesOverview } from '@/components/services-overview'
import { SpecializationsPreview } from '@/components/specializations-preview'
import { ViessmannBanner } from '@/components/viessmann-banner'
import { CTASection } from '@/components/cta-section'

export default function Home() {
  return (
    <div className="pt-20">
      <Hero />
      <ViessmannBanner />
      <ServicesOverview />
      <SpecializationsPreview />
      <CTASection />
    </div>
  )
}
