"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PlansSection } from "@/components/plans-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import DecorativeSection from "@/components/decorative-section"
import { TestimonialsSectionMobile } from "@/components/ui/testimonial-section-mobile"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <PlansSection />
        <HowItWorksSection />
        <section className="sm:hidden">
          <TestimonialsSectionMobile />
        </section>
        <section className="hidden sm:block">
          <TestimonialsSection />
        </section>
        <DecorativeSection />
      </main>
      <Footer />
    </div>
  )
}
