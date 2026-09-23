"use client";

import { cn } from "@/lib/utils";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Key, Car, Calendar, XCircle, ShieldCheck, Zap, Accessibility, Droplets } from "lucide-react";

const SPRING = {
  bounce: 0.1,
  duration: 0.25,
  type: "spring" as const,
};

const features = [
  {
    description: "Premium valet service available 24/7 upon arrival at the main entrance.",
    icon: <Car className="h-6 w-6 text-orange-500" strokeWidth={1.5} />,
    title: "Valet Service",
  },
  {
    description: "Fast electric vehicle charging stations available on every parking level.",
    icon: <Zap className="h-6 w-6 text-orange-500" strokeWidth={1.5} />,
    title: "EV Charging",
  },
  {
    description: "24/7 monitored and secure parking garage with dedicated security patrols.",
    icon: <ShieldCheck className="h-6 w-6 text-orange-500" strokeWidth={1.5} />,
    title: "Secure Parking",
  },
  {
    description: "Extended parking options available for guests embarking on longer journeys.",
    icon: <Calendar className="h-6 w-6 text-orange-500" strokeWidth={1.5} />,
    title: "Long Term",
  },
  {
    description: "Extra-wide, dedicated accessible parking spots located near all elevators.",
    icon: <Accessibility className="h-6 w-6 text-orange-500" strokeWidth={1.5} />,
    title: "Accessible Spaces",
  },
  {
    description: "On-site eco-friendly car wash and professional detailing services.",
    icon: <Droplets className="h-6 w-6 text-orange-500" strokeWidth={1.5} />,
    title: "Car Wash",
  },
];

export function FeaturesGrid() {
  const shouldReduceMotion = useReducedMotion();
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsHoverDevice(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsHoverDevice(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section aria-labelledby="features-grid-heading" className="bg-transparent">
      <div className="pt-24 md:pt-32 pb-[200px]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              className="text-balance font-normal text-3xl tracking-tight md:text-4xl text-gray-900"
              id="features-grid-heading"
            >
              Car parking or charging
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Secure parking and convenient EV charging options available for all our guests during their stay.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.li
                className={cn(
                  "relative rounded-xl border border-gray-200 bg-white p-6 transition-shadow group cursor-pointer",
                  isHoverDevice && !shouldReduceMotion && "hover:shadow-md hover:border-orange-200 hover:bg-orange-50/30"
                )}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                }
                key={feature.title}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { ...SPRING, delay: index * 0.05 }
                }
                viewport={{ margin: "-100px", once: true }}
                whileHover={
                  isHoverDevice && !shouldReduceMotion ? { y: -4 } : undefined
                }
                whileInView={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                }
              >
                <div className="mb-4 inline-flex rounded-lg bg-orange-100 p-2.5 text-orange-600 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                
                <button aria-label="Next" className="absolute top-6 right-6 p-2 rounded-full border border-gray-200 bg-gray-50 text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-600 group-hover:border-orange-200 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[2deg]" />
                </button>

                <h3 className="mb-2 font-normal text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.li>
            ))}
          </ul>

          {/* ── Inline Parking Suggestion ──────────────────────── */}
          <div className="mt-16 text-center">
            <h3 className="text-xl md:text-2xl font-normal tracking-tight text-gray-900 mb-6">
              How would you like to proceed with your parking arrangements?
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Valet Parking", icon: Key },
                { label: "Self Parking", icon: Car },
                { label: "Reserve Spot", icon: Calendar },
                { label: "No Parking Needed", icon: XCircle },
              ].map((tag) => (
                <button
                  key={tag.label}
                  className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/60 px-5 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 group cursor-pointer"
                >
                  <tag.icon className="w-4 h-4 text-orange-400 group-hover:text-orange-600 transition-colors" />
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid;
