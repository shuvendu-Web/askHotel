import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MapPin, DoorOpen, BedDouble, Bath, Waves, Snowflake, Refrigerator, Utensils, Blinds } from 'lucide-react';

/**
 * @typedef CardItem
 * @property {string | number} id - Unique identifier for the card.
 * @property {string} title - The main title text of the card.
 * @property {string} subtitle - The subtitle or category text.
 * @property {string} imageUrl - The URL for the card's background image.
 */
export interface CardItem {
  id: string | number;
  title: string;
  subtitle: string;
  imageUrl: string;
  // Optional extra details for the popup
  rating?: number;
  location?: string;
  price?: string;
  description?: string;
  rooms?: string;
  beds?: string;
  baths?: string;
  pool?: string;
  ac?: string;
  fridge?: string;
  kitchen?: string;
  windows?: string;
}

/**
 * @typedef HoverRevealCardsProps
 * @property {CardItem[]} items - An array of card item objects to display.
 * @property {string} [className] - Optional additional class names for the container.
 * @property {string} [cardClassName] - Optional additional class names for individual cards.
 */
export interface HoverRevealCardsProps {
  items: CardItem[];
  className?: string;
  cardClassName?: string;
}

/**
 * A component that displays a grid of cards with a hover-reveal effect.
 * When a card is hovered or focused, it stands out while others are de-emphasized.
 */
const HoverRevealCards: React.FC<HoverRevealCardsProps> = ({
  items,
  className,
  cardClassName,
}) => {
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  return (
    <>
    <div
      role="list"
      className={cn(
        'group grid w-full max-w-6xl mx-auto grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4',
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          role="listitem"
          aria-label={`${item.title}, ${item.subtitle}`}
          tabIndex={0}
          onClick={() => setSelectedItem(item)}
          onKeyDown={(e) => { if (e.key === 'Enter') setSelectedItem(item); }}
          className={cn(
            'relative h-80 cursor-pointer overflow-hidden rounded-xl bg-cover bg-center shadow-lg transition-all duration-500 ease-in-out',
            // On parent hover, apply these styles to all children.
            'group-hover:scale-[0.97] group-hover:opacity-60 group-hover:blur-[2px]',
            // On child hover/focus, override parent hover styles to highlight the current item.
            // The `!` is used to ensure these styles take precedence.
            'hover:!scale-105 hover:!opacity-100 hover:!blur-none focus-visible:!scale-105 focus-visible:!opacity-100 focus-visible:!blur-none',
            // Accessibility: Add focus ring using theme variables.
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ring-offset-background',
            cardClassName
          )}
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        >
          {/* Gradient overlay for text contrast, a standard UI practice for text on images. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Card Content */}
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <p className="text-sm font-light uppercase tracking-widest opacity-80 text-orange-200">
              {item.subtitle}
            </p>
            <h3 className="mt-1 text-2xl font-semibold">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>

    {isClient && createPortal(
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur hover:bg-white text-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Section */}
            <div 
              className="w-full md:w-1/2 h-64 md:h-auto bg-cover bg-center relative"
              style={{ backgroundImage: `url(${selectedItem.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
              <div className="absolute bottom-4 left-4 md:hidden text-white">
                <p className="text-sm font-light uppercase tracking-widest text-orange-200">
                  {selectedItem.subtitle}
                </p>
                <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-start bg-white overflow-y-auto">
              <div className="hidden md:block mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-1">
                  {selectedItem.subtitle}
                </p>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {selectedItem.title}
                </h3>
              </div>

              <div className="flex items-center justify-between mb-4">
                {selectedItem.rating && (
                  <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-semibold w-fit">
                    <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                    {selectedItem.rating}
                  </div>
                )}
                {selectedItem.location && (
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-orange-400" />
                    {selectedItem.location}
                  </div>
                )}
              </div>

              {/* Amenities Grid */}
              {(selectedItem.rooms || selectedItem.beds) && (
                <div className="w-full grid grid-cols-2 gap-y-2 gap-x-2 my-2 mb-4 h-[140px] overflow-y-auto pr-1">
                  {selectedItem.rooms && (
                    <div className="flex items-center text-gray-700 text-[11px] font-medium bg-gray-50/50 p-1.5 rounded-lg border border-gray-100">
                      <DoorOpen className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                      <span className="truncate">{selectedItem.rooms}</span>
                    </div>
                  )}
                  {selectedItem.beds && (
                    <div className="flex items-center text-gray-700 text-[11px] font-medium bg-gray-50/50 p-1.5 rounded-lg border border-gray-100">
                      <BedDouble className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                      <span className="truncate">{selectedItem.beds}</span>
                    </div>
                  )}
                  {selectedItem.baths && (
                    <div className="flex items-center text-gray-700 text-[11px] font-medium bg-gray-50/50 p-1.5 rounded-lg border border-gray-100">
                      <Bath className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                      <span className="truncate">{selectedItem.baths}</span>
                    </div>
                  )}
                  {selectedItem.pool && (
                    <div className="flex items-center text-gray-700 text-[11px] font-medium bg-gray-50/50 p-1.5 rounded-lg border border-gray-100">
                      <Waves className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                      <span className="truncate">{selectedItem.pool}</span>
                    </div>
                  )}
                  {selectedItem.ac && (
                    <div className="flex items-center text-gray-700 text-[11px] font-medium bg-gray-50/50 p-1.5 rounded-lg border border-gray-100">
                      <Snowflake className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                      <span className="truncate">{selectedItem.ac}</span>
                    </div>
                  )}
                  {selectedItem.fridge && (
                    <div className="flex items-center text-gray-700 text-[11px] font-medium bg-gray-50/50 p-1.5 rounded-lg border border-gray-100">
                      <Refrigerator className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                      <span className="truncate">{selectedItem.fridge}</span>
                    </div>
                  )}
                  {selectedItem.kitchen && (
                    <div className="flex items-center text-gray-700 text-[11px] font-medium bg-gray-50/50 p-1.5 rounded-lg border border-gray-100">
                      <Utensils className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                      <span className="truncate">{selectedItem.kitchen}</span>
                    </div>
                  )}
                  {selectedItem.windows && (
                    <div className="flex items-center text-gray-700 text-[11px] font-medium bg-gray-50/50 p-1.5 rounded-lg border border-gray-100">
                      <Blinds className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                      <span className="truncate">{selectedItem.windows}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-xl font-bold text-gray-900">
                    {selectedItem.price || "$299"} <span className="text-sm font-normal text-gray-500">/ night</span>
                  </p>
                </div>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-orange-500/20">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
};

export default HoverRevealCards;
