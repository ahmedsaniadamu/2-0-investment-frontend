"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PlansSection } from "@/components/plans-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <main>
        <HeroSection />
        <PlansSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
