import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content:
      "I started with the Starter Plan and have seen consistent returns. The platform is easy to use and the support team is always helpful.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    content:
      "The Growth Plan has exceeded my expectations. The monthly returns are reliable and the dashboard makes tracking my investments simple.",
    rating: 5,
    initials: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    content:
      "As a Pro Plan member, I appreciate the personalized service and exclusive opportunities. My portfolio has grown significantly.",
    rating: 5,
    initials: "ER",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Trusted by Investors
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            See what our clients say about their investment experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="mb-6 text-pretty text-muted-foreground">"{testimonial.content}"</p>

                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
