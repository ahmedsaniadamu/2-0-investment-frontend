import React from 'react'
import { Eye, TrendingUp, ShieldCheck } from "lucide-react"

const DecorativeSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {[
                        {
                            title: "Transparency",
                            desc: "Real-time tracking of all your investments.",
                            icon: Eye
                        },
                        {
                            title: "Performance",
                            desc: "Consistent returns tailored for your growth.",
                            icon: TrendingUp
                        },
                        {
                            title: "Trust",
                            desc: "Securing your future with professional expertise.",
                            icon: ShieldCheck
                        }
                    ].map((item, i) => (
                        <div key={i} className="space-y-4 group">
                            <div className="mx-auto w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <item.icon size={32} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-xl uppercase tracking-wider">{item.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[250px] mx-auto">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50" />
        </section>
    )
}

export default DecorativeSection