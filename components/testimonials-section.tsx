'use client'

import React from 'react'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useQuery } from '@tanstack/react-query'
import { feedbackService } from '@/services/feedback'
import { Skeleton } from "@/components/ui/skeleton"

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-0.5 items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className="w-4 h-4 fill-slate-200 text-slate-200" />
          <div className="absolute top-0 left-0 overflow-hidden w-[50%]">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 fill-slate-200 text-slate-200" />
      ))}
    </div>
  );
};

export function TestimonialsSection() {

  const { data: testimonialsData, isPending } = useQuery({
    queryKey: ["feedbackLandingPage"],
    queryFn: () => feedbackService.getLandingPageFeedback(),
  });

  const testimonials = testimonialsData || [];

  const settings = {
    dots: true,
    infinite: testimonials.length > 3,
    speed: 8000,
    slidesToShow: Math.min(testimonials.length, 3) || 1,
    slidesToScroll: 1,
    autoplay: testimonials.length > 3,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(testimonials.length, 2) || 1,
          slidesToScroll: 1,
          infinite: testimonials.length > 2,
          autoplay: testimonials.length > 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: testimonials.length > 1,
          autoplay: testimonials.length > 1,
          autoplaySpeed: 4000,
          speed: 500,
          cssEase: "ease",
          width: "100%",
        }
      }
    ],
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "-50px" }}>
        <ul className="flex justify-center gap-2 m-0 p-0"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 mx-1 bg-primary/20 rounded-full transition-all duration-300 hover:bg-primary/50 [.slick-active_&]:bg-primary [.slick-active_&]:w-8" />
    )
  }

  const getInitials = (name: string) => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="h-[320px] border-none shadow-lg bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100" />
          <CardContent className="pt-8 pb-6 px-6 sm:pt-10 sm:pb-8 sm:px-8 flex flex-col h-full">
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Skeleton key={s} className="h-4 w-4 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-4 w-full mb-3" />
            <Skeleton className="h-4 w-[90%] mb-3" />
            <Skeleton className="h-4 w-[80%] mb-10" />
            <div className="flex items-center gap-4 mt-auto">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <section id="testimonials" className="py-20 md:py-32 overflow-hidden bg-slate-50/50">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
            Testimonials
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Trusted by our customers
          </h2>
          <p className="max-w-2xl mx-auto text-pretty text-lg text-muted-foreground">
            Join our growing community and see why customers choose 2Zero Investment for their financial future.
          </p>
        </motion.div>

        <div className="relative">
          {isPending ? (
            <SkeletonLoader />
          ) : testimonials.length > 0 ? (
            <Slider {...settings} className="testimonial-slider">
              {testimonials.map((testimonial: any, index: number) => (
                <div key={testimonial.id || index} className="h-full block pb-8 px-2 max-[500px]:w-[300px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="h-full w-full"
                  >
                    <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white relative group overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-1.5 bg-primary`} />
                      <CardContent className="pt-8 pb-6 px-6 sm:pt-10 sm:pb-8 sm:px-8 relative flex flex-col h-full min-h-[320px] sm:min-h-[300px]">
                        <Quote className="absolute top-4 right-6 sm:top-6 sm:right-8 text-slate-100 w-10 h-10 sm:w-12 sm:h-12 -z-0 group-hover:text-slate-200 transition-colors" />

                        <div className="mb-4 relative z-10 pointer-events-none">
                          <StarRating rating={Number(testimonial.rating)} />
                        </div>

                        <p className="mb-8 text-pretty text-slate-600 italic leading-relaxed relative z-10 flex-grow">
                          "{testimonial.comment}"
                        </p>

                        <div className="flex items-center gap-4 relative z-10 mt-auto pt-6 border-t border-slate-50">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarFallback className={`bg-primary text-white font-bold`}>
                              {getInitials(testimonial?.investor?.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-slate-900 line-clamp-1">{testimonial?.investor?.name || 'Investor'}</div>
                            <div className="text-xs font-semibold text-primary uppercase tracking-wider line-clamp-1">
                              {testimonial?.role || 'Verified Investor'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-dashed border-slate-200">
              <p className="text-slate-500">No testimonials yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
