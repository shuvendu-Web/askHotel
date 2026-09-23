"use client";

import React from "react";
import Image from "next/image";

const rooms = [
  {
    name: "Standard Room",
    price: "$145 / night",
    image: "/images/room-standard.jpg",
    size: "350 sq ft, cozy layout",
    bed: "1 Queen Bed",
    view: "City View",
    bestFor: "Solo travelers or short business trips",
  },
  {
    name: "Deluxe Ocean View",
    price: "$245 / night",
    image: "/images/room-deluxe.jpg",
    size: "500 sq ft, spacious layout",
    bed: "1 King Bed",
    view: "Ocean View",
    bestFor: "Couples seeking a romantic getaway",
  },
  {
    name: "Luxury Suite",
    price: "$495 / night",
    image: "/images/room-suite.jpg",
    size: "850 sq ft, separate living area",
    bed: "1 King Bed & Sofa Bed",
    view: "Panoramic Ocean",
    bestFor: "Families or extended luxury stays",
  },
];

export function PricingComparison({ onBookClick }: { onBookClick?: () => void }) {
  return (
    <section className="bg-transparent pb-[200px] px-6 pt-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 font-normal text-3xl tracking-tight text-gray-900 md:text-4xl text-center">
          Which room is right for you?
        </h2>

        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[800px]">
            {/* Header Row (Images & Titles) */}
            <div className="grid grid-cols-4 gap-6 mb-8 items-end">
              <div className="col-span-1"></div>
              {rooms.map((room) => (
                <div key={room.name} className="col-span-1 flex flex-col pr-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 mb-6">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{room.price}</p>
                </div>
              ))}
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-orange-200 border-t border-orange-200">
              {/* Row 1: Size */}
              <div className="grid grid-cols-4 gap-6 py-6 items-center">
                <div className="col-span-1 text-sm text-gray-500">Size</div>
                {rooms.map((room) => (
                  <div key={room.name} className="col-span-1 text-sm text-gray-900 pr-4">
                    {room.size}
                  </div>
                ))}
              </div>

              {/* Row 2: Bed */}
              <div className="grid grid-cols-4 gap-6 py-6 items-center">
                <div className="col-span-1 text-sm text-gray-500">Bed</div>
                {rooms.map((room) => (
                  <div key={room.name} className="col-span-1 text-sm text-gray-900 pr-4">
                    {room.bed}
                  </div>
                ))}
              </div>

              {/* Row 3: View */}
              <div className="grid grid-cols-4 gap-6 py-6 items-center">
                <div className="col-span-1 text-sm text-gray-500">View</div>
                {rooms.map((room) => (
                  <div key={room.name} className="col-span-1 text-sm text-gray-900 pr-4">
                    {room.view}
                  </div>
                ))}
              </div>

              {/* Row 4: Best for */}
              <div className="grid grid-cols-4 gap-6 py-6 items-center border-b border-orange-200">
                <div className="col-span-1 text-sm text-gray-500">Best for</div>
                {rooms.map((room) => (
                  <div key={room.name} className="col-span-1 text-sm text-gray-900 pr-4 leading-relaxed">
                    {room.bestFor}
                  </div>
                ))}
              </div>

              {/* Row 5: Action */}
              <div className="grid grid-cols-4 gap-6 py-6 items-center">
                <div className="col-span-1"></div>
                {rooms.map((room) => (
                  <div key={room.name} className="col-span-1 pr-4">
                    <button
                      onClick={onBookClick}
                      className="w-full rounded-full bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-orange-600 shadow-md shadow-orange-500/20"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
