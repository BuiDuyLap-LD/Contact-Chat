import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import ServicesPreview from '@/components/ServicesPreview'
import PortfolioPreview from '@/components/PortfolioPreview'
import ChatCTA from '@/components/ChatCTA'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <PortfolioPreview />
      <ChatCTA />
      <Footer />
    </main>
  )
}
