import { SiteHeader } from '@/components/SiteHeader'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { TrialSection } from '@/components/TrialSection'
import { PricingSection } from '@/components/PricingSection'
import { ServersSection } from '@/components/ServersSection'
import { ConnectionSection } from '@/components/ConnectionSection'
import { FaqSection } from '@/components/FaqSection'
import { ClosingSection } from '@/components/ClosingSection'
import { SiteFooter } from '@/components/SiteFooter'
import { EngagementModal } from '@/components/EngagementModal'
import { useEngagementPrompt } from '@/hooks/useEngagementPrompt'

function MainPage() {
  const { isOpen, close } = useEngagementPrompt()

  return (
    <div className="mx-auto w-full max-w-[960px] text-white tracking-[-0.3px]">
      <SiteHeader />
      <main className="mt-9 flex flex-col gap-9">
        <HeroSection />
        <FeaturesSection />
        <TrialSection />
        <PricingSection />
        <ServersSection />
        <ConnectionSection />
        <FaqSection />
        <ClosingSection />
      </main>
      <SiteFooter />
      <EngagementModal isOpen={isOpen} onClose={close} />
    </div>
  )
}

export default MainPage
