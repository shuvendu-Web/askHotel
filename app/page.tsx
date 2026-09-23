"use client";

import { Component as BackgroundGrid } from "@/components/ui/background-snippets";
import { BorderBeam } from "@/components/ui/border-beam-search";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import { CalendlyCarousel, CarouselItem } from "@/components/ui/connected-carousel";
import { StackingNavbar } from "@/components/ui/stacking-navbar";
import { FeaturesGrid } from "@/components/ui/features-grid";
import { PricingComparison } from "@/components/ui/pricing-comparison";
import { BookingForm } from "@/components/ui/booking-form";
import HoverRevealCards, { CardItem } from "@/components/ui/cards";
import FluidText from "@/components/ui/fluid-text";
import {
  Search,
  MapPin,
  Map,
  Calendar,
  Users,
  Star,
  ChevronDown,
  Heart,
  Baby,
  Briefcase,
  User,
  PartyPopper,
  Car,
  Key,
  XCircle,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

const DEMO_CARDS: CardItem[] = [
  {
    id: 1,
    title: 'Echoes',
    subtitle: 'Grand Canyon',
    imageUrl: 'https://cdn.21st.dev/assets/mirror/11/1127d9ddb36716d0f7406f792ab484510ac712219d535e18a099d3381233cff4.jpg',
    rating: 4.9,
    location: "Arizona, USA",
    price: "$450",
    description: "Carved by the Colorado River, this immense canyon offers breathtaking views, iconic hiking trails, and a rich history written in its layered bands of red rock. The perfect spot for stargazing and connecting with nature.",
    rooms: "3 Bedrooms",
    beds: "4 Beds",
    baths: "3 Baths",
    pool: "Private Pool",
    ac: "Air Conditioning",
    fridge: "Full Refrigerator",
    kitchen: "Chef's Kitchen",
    windows: "Floor-to-ceiling",
  },
  {
    id: 2,
    title: 'Highest Mountain',
    subtitle: 'Yosemite',
    imageUrl: 'https://cdn.21st.dev/assets/mirror/44/4466346f6258e5ebe8e2e96e074c58fe8bbcdeeb24765fdecec6e2fb2d7dc8e5.jpg',
    rating: 4.8,
    location: "California, USA",
    price: "$380",
    description: "Experience the majestic granite cliffs, towering waterfalls, and ancient sequoia groves of Yosemite Valley. A premier destination for rock climbers, photographers, and nature lovers seeking absolute serenity.",
    rooms: "2 Bedrooms",
    beds: "3 Beds",
    baths: "2 Baths",
    pool: "Shared Pool",
    ac: "Central AC",
    fridge: "Mini Fridge",
    kitchen: "Kitchenette",
    windows: "Forest Views",
  },
  {
    id: 3,
    title: 'Deep Desert',
    subtitle: 'Sahara',
    imageUrl: 'https://cdn.21st.dev/assets/mirror/51/51cdd8d3464631792370abe5c107a2645a0fd067450c67b27f1d26e510dd8956.jpg',
    rating: 4.7,
    location: "North Africa",
    price: "$520",
    description: "Embark on an unforgettable journey across endless golden dunes under a canopy of stars. Enjoy luxury desert camps, sunset camel treks, and the profound silence of the world's largest hot desert.",
    rooms: "1 Bedroom Tent",
    beds: "1 King Bed",
    baths: "1 Private Bath",
    pool: "Oasis Pool",
    ac: "Climate Control",
    fridge: "Cooler Provided",
    kitchen: "Catered Meals",
    windows: "Open Air Setup",
  },
  {
    id: 4,
    title: 'Breath-taking',
    subtitle: 'Landscape',
    imageUrl: 'https://cdn.21st.dev/assets/mirror/20/20f995189be15b38c7652b025aa3159ebdc7bfd284ed49303dc2b6e7dac489dd.jpg',
    rating: 4.9,
    location: "Swiss Alps",
    price: "$650",
    description: "Immerse yourself in crisp alpine air, crystal clear lakes, and snow-capped peaks. Whether skiing down pristine slopes or relaxing in a luxury mountain lodge, this breathtaking landscape has it all.",
    rooms: "4 Bedrooms",
    beds: "6 Beds",
    baths: "4 Baths",
    pool: "Heated Indoor Pool",
    ac: "Heating & AC",
    fridge: "Stocked Fridge",
    kitchen: "Full Kitchen",
    windows: "Mountain Views",
  },
];

const EXPERIENCES_DATA: CarouselItem[] = [
  {
    id: "luxury-suite",
    hotelName: "The Azure Retreat",
    location: "Santorini, Greece",
    price: "$850",
    rating: 4.9,
    rooms: "2 Bedrooms",
    beds: "2 King Beds",
    baths: "2 Bathrooms",
    pool: "Private Pool",
    ac: "Central AC",
    kitchen: "Full Kitchen",
    fridge: "Stocked Mini-fridge",
    windows: "Ocean View",
    defaultImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=640&q=80",
    selectedImage: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=640&q=80",
  },
  {
    id: "spa-wellness",
    hotelName: "Oasis Wellness Resort",
    location: "Bali, Indonesia",
    price: "$420",
    rating: 4.8,
    rooms: "1 Villa",
    beds: "1 Queen Bed",
    baths: "1 Bathroom",
    pool: "Shared Pool",
    ac: "Split AC",
    kitchen: "Kitchenette",
    fridge: "Mini-fridge",
    windows: "Garden View",
    defaultImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=640&q=80",
    selectedImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=640&q=80",
  },
  {
    id: "fine-dining",
    hotelName: "Château de Lumière",
    location: "Paris, France",
    price: "$1,200",
    rating: 5.0,
    rooms: "3 Bedrooms",
    beds: "4 Beds",
    baths: "3 Bathrooms",
    pool: "Indoor Pool",
    ac: "Climate Control",
    kitchen: "Chef's Kitchen",
    fridge: "Wine Fridge",
    windows: "City View",
    defaultImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=640&q=80",
    selectedImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=640&q=80",
  },
  {
    id: "beach-club",
    hotelName: "Coral Sands Villa",
    location: "Maldives",
    price: "$2,100",
    rating: 4.9,
    rooms: "Overwater Villa",
    beds: "1 King Bed",
    baths: "Outdoor Bath",
    pool: "Private Plunge Pool",
    ac: "Air Conditioning",
    kitchen: "Bar Area",
    fridge: "Stocked Fridge",
    windows: "Panoramic Ocean",
    defaultImage: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?w=640&q=80",
    selectedImage: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?w=640&q=80",
  },
  {
    id: "concierge",
    hotelName: "The Grand Metropolis",
    location: "Tokyo, Japan",
    price: "$680",
    rating: 4.7,
    rooms: "Executive Suite",
    beds: "2 Double Beds",
    baths: "2 Bathrooms",
    pool: "Rooftop Pool",
    ac: "Smart AC",
    kitchen: "Pantry",
    fridge: "Mini-bar",
    windows: "Skyline View",
    defaultImage: "https://images.unsplash.com/photo-1551882547-ff40eb0d1e71?w=640&q=80",
    selectedImage: "https://images.unsplash.com/photo-1551882547-ff40eb0d1e71?w=640&q=80",
  },
];

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=640&q=80",
    alt: "Luxurious Stays",
    title: "Luxurious Stays",
    subtitle: "Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=640&q=80",
    alt: "Culinary Excellence",
    title: "Culinary Excellence",
    subtitle: "Dining",
  },
  {
    src: "/spa.jpg",
    alt: "Ultimate Relaxation",
    title: "Ultimate Relaxation",
    subtitle: "Spa",
  },
  {
    src: "/Activities.jpg",
    alt: "Endless Adventure",
    title: "Endless Adventure",
    subtitle: "Activities",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=640&q=80",
    alt: "Premium Services",
    title: "Premium Services",
    subtitle: "Others",
  },
];

export default function HeroPage() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Adults");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      // Trigger fixed state when scrolled past 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-transparent overflow-x-hidden">
      {/* ── Background (white grid + orange glow) ────────────── */}
      <BackgroundGrid />

      {/* ── Hero Section ────────────── */}
      <section className="relative h-[100dvh] w-full flex flex-col">

      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 md:px-16">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30">
            <Star className="h-4 w-4 fill-white text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            ask<span className="text-orange-500">Hotel</span>
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {["Explore", "Destinations", "Deals", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-900"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-gray-700 ring-1 ring-gray-200 backdrop-blur-sm transition-all hover:bg-white hover:text-orange-500 hover:shadow-sm">
            <Map className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-orange-600 hover:shadow-sm shadow-orange-500/20"
          >
            BOOK NOW
          </button>
        </div>
      </nav>



      {/* ── Carousel Stacked ────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center w-full mt-0">
        <CoverflowCarousel slides={HERO_SLIDES} autoPlay={true} autoPlayInterval={3000} cardWidth="clamp(120px, 16vw, 180px)" />
      </div>

      {/* ── Search Bar & Bottom Options ──────────────────────── */}
      <div 
        className={`left-0 right-0 z-50 flex flex-col items-center px-4 transition-all duration-500 ${
          isScrolled 
            ? "fixed bottom-0 pt-12 pb-6 bg-[linear-gradient(0deg,#fff_0%,#ffffffdb_61%,#ffffff00_100%)]" 
            : "absolute bottom-4 md:bottom-8"
        }`}
      >
        <div className={`transition-all duration-300 flex items-center justify-center relative z-20 ${isScrolled ? "opacity-0 h-0 overflow-hidden m-0" : "opacity-100 mb-0 w-full max-w-5xl h-[60px] sm:h-[80px] md:h-[100px]"}`}>
          <FluidText 
            text="Welcome to Holiday Inn Resort Bali"
            font={{ fontSize: 32, fontWeight: 400, fontFamily: "inherit", letterSpacing: "0.02em" }}
            color="#000000"
            paletteColors={["#ff7a00", "#ff5500", "#ff9900", "#ff3300", "#ffcc00"]}
          />
        </div>

        {/* Light Glassmorphism search input with BorderBeam */}
        <div className="w-full max-w-lg relative">
          {/* Subtle glow behind the glass */}
          <div className="absolute -inset-4 bg-orange-500/20 blur-2xl rounded-full pointer-events-none" />
          <BorderBeam size="line" colorVariant="colorful" duration={3.1} borderRadius={40}>
            <div className="relative flex items-center w-full overflow-hidden rounded-[40px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(255,165,0,0.15)] ring-1 ring-white/50">
              <div className="flex h-12 w-full items-center px-6">
                <Search className="h-5 w-5 text-orange-600 mr-4 shrink-0" />
                <input
                  className="w-full bg-transparent text-gray-900 placeholder-gray-600 outline-none text-base font-medium"
                  placeholder="Search destinations, hotels, or experiences..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <button className="ml-4 flex h-10 px-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-300/50 transition-transform duration-150 hover:scale-105 active:scale-95 text-white font-semibold text-sm">
                  Search
                </button>
              </div>
            </div>
          </BorderBeam>
        </div>

        {/* Quick filters */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 max-w-4xl relative z-50 overflow-visible">
          <span className="text-xs font-semibold text-gray-600 mr-2 min-w-[150px] text-right">
            {isScrolled ? "Travel Booking Journey" : "Travel Planning With:"}
          </span>
          <div className="flex-1 w-full flex flex-wrap items-center gap-2 pr-12 lg:pr-0">
            {isScrolled ? (
              <StackingNavbar 
                items={[
                  { label: "Honeymoon", icon: Heart },
                  { label: "With Love", icon: Heart },
                  { label: "Family Vacation", icon: Baby },
                  { label: "Corporate Trip", icon: Briefcase },
                  { label: "With Friends", icon: PartyPopper },
                  { label: "Solo Traveler", icon: User },
                ]}
              />
            ) : (
              <>
                {[
                  { label: "Honeymoon", icon: Heart },
                  { label: "With Love", icon: Heart },
                  { label: "Family Vacation", icon: Baby },
                  { label: "Corporate Trip", icon: Briefcase },
                  { label: "With Friends", icon: PartyPopper },
                  { label: "Solo Traveler", icon: User },
                ].map((tag) => (
                  <button
                    key={tag.label}
                    className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/60 px-4 py-1.5 text-xs font-medium text-gray-600 backdrop-blur-sm transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 group"
                  >
                    <tag.icon className="w-3.5 h-3.5 text-orange-400 group-hover:text-orange-600 transition-colors" />
                    {tag.label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>

      </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 border-orange-500 mt-4 md:mt-8"></div>

      {/* ── Products Details Section ─────────────────────────── */}
      <section className="relative z-10 w-full pt-24 pb-[200px] bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-gray-900 mb-4">
            Curated Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what makes our properties truly exceptional through the eyes of our guests.
          </p>
        </div>
        
        <CalendlyCarousel
          items={EXPERIENCES_DATA}
          autoPlayInterval={5000}
          pauseOnHover={true}
        />
      </section>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 border-orange-500"></div>

      <FeaturesGrid />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 border-orange-500 mt-8"></div>

      <PricingComparison onBookClick={() => setIsBookingOpen(true)} />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t-2 border-orange-500 mt-8"></div>

      {/* ── Hover Reveal Cards Section ──────────────────────── */}
      <section className="relative z-10 w-full pt-24 pb-[200px] bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-gray-900 mb-4">
            Stunning Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore some of the most breathtaking landscapes around the world.
          </p>
        </div>
        <HoverRevealCards items={DEMO_CARDS} />
      </section>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {isClient && isBookingOpen && (
          <BookingForm 
            onSchedule={(details) => {
              console.log("Booking Details:", details);
              setIsBookingOpen(false);
              alert(`Booking confirmed for ${details.guests.adults} Adults, ${details.guests.children} Children from ${details.checkIn?.toLocaleDateString()} to ${details.checkOut?.toLocaleDateString()}!`);
            }}
            onCancel={() => setIsBookingOpen(false)}
          />
        )}
      </AnimatePresence>

    </main>
  );
}
