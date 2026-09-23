"use client";

import * as React from "react";
import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
} from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Users, Plus, Minus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface BookingFormProps {
  onSchedule: (details: { checkIn: Date | null; checkOut: Date | null; guests: { adults: number; children: number; infants: number } }) => void;
  onCancel: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  onSchedule,
  onCancel,
}) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [infants, setInfants] = useState(0);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const handleDateClick = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (isBefore(day, startDate)) {
      setStartDate(day);
    } else {
      setEndDate(day);
    }
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getEventSummary = () => {
    if (!startDate) return "Select dates for your stay.";
    const startFormatted = format(startDate, "MMM d, yyyy");
    if (!endDate) return `Check-in: ${startFormatted}`;
    const endFormatted = format(endDate, "MMM d, yyyy");
    return `Stay: ${startFormatted} to ${endFormatted}`;
  };

  const handleSchedule = () => {
    onSchedule({ checkIn: startDate, checkOut: endDate, guests: { adults, children: childrenCount, infants } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
    >
      <Card className="w-full max-w-4xl mx-auto overflow-hidden shadow-2xl border-none bg-white/95 backdrop-blur-xl relative">
        <Button variant="ghost" size="icon" className="absolute top-4 right-4 z-10 rounded-full hover:bg-gray-100" onClick={onCancel}>
          <X className="h-5 w-5 text-gray-500" />
        </Button>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
        <CardHeader className="flex flex-row items-start gap-4 pb-4 border-b border-gray-100">
          <div className="p-3 rounded-full bg-orange-100 text-orange-500">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900">Book Your Stay</CardTitle>
            <CardDescription className="text-base text-gray-500">Select dates and guests to find available rooms.</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Left Side: Calendar */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-full hover:bg-orange-50">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </Button>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={format(currentMonth, "MMMM yyyy")}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-medium text-center text-gray-900"
                >
                  {format(currentMonth, "MMMM yyyy")}
                </motion.h3>
              </AnimatePresence>
              <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-full hover:bg-orange-50">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {days.map((day) => {
                const isSelected = (startDate && isSameDay(day, startDate)) || (endDate && isSameDay(day, endDate));
                const isInRange = startDate && endDate && isAfter(day, startDate) && isBefore(day, endDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);

                return (
                  <motion.button
                    key={day.toString()}
                    onClick={() => handleDateClick(day)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "relative h-10 w-full flex items-center justify-center transition-colors duration-200 text-sm font-medium",
                      !isCurrentMonth && "text-gray-300",
                      isCurrentMonth && "text-gray-700",
                      isSameDay(day, new Date()) && !isSelected && "text-orange-500 font-bold",
                      isSelected && "bg-orange-500 text-white z-10 rounded-full shadow-md shadow-orange-500/30",
                      isInRange && "bg-orange-50 text-orange-900",
                      startDate && isSameDay(day, startDate) && endDate && "rounded-l-full rounded-r-none",
                      endDate && isSameDay(day, endDate) && "rounded-r-full rounded-l-none"
                    )}
                  >
                    <span className="relative z-10">{format(day, "d")}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* Right Side: Inputs & Guests */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                {/* Check-in */}
                <div>
                  <Label className="text-sm font-medium text-gray-600">Check-in</Label>
                  <div className="flex items-center mt-2 p-3 rounded-xl border border-gray-200 bg-gray-50/50">
                    <span className="text-sm font-semibold text-gray-900">
                      {startDate ? format(startDate, "MMM d, yyyy") : "Select date"}
                    </span>
                  </div>
                </div>

                {/* Check-out */}
                <div>
                  <Label className="text-sm font-medium text-gray-600">Check-out</Label>
                  <div className="flex items-center mt-2 p-3 rounded-xl border border-gray-200 bg-gray-50/50">
                    <span className="text-sm font-semibold text-gray-900">
                      {endDate ? format(endDate, "MMM d, yyyy") : "Select date"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guests Section */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4 text-gray-900">
                  <Users className="w-5 h-5 text-orange-500" />
                  <h4 className="font-medium text-lg">Guests</h4>
                </div>
                
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Adults</p>
                      <p className="text-xs text-gray-500">Ages 13 or above</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200" onClick={() => setAdults(Math.max(1, adults - 1))}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-4 text-center font-medium text-sm text-gray-900">{adults}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200" onClick={() => setAdults(adults + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Children</p>
                      <p className="text-xs text-gray-500">Ages 2-12</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200" onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-4 text-center font-medium text-sm text-gray-900">{childrenCount}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200" onClick={() => setChildrenCount(childrenCount + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Infants */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Infants</p>
                      <p className="text-xs text-gray-500">Under 2</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200" onClick={() => setInfants(Math.max(0, infants - 1))}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-4 text-center font-medium text-sm text-gray-900">{infants}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-200 text-gray-500 hover:text-orange-500 hover:border-orange-200" onClick={() => setInfants(infants + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
            {/* Footer section */}
            <div className="pt-4 border-t border-gray-100 mt-auto">
                <p className="text-sm font-medium text-orange-600 mb-4">{getEventSummary()}</p>
                <div className="flex justify-end gap-3 w-full">
                    <Button variant="ghost" onClick={onCancel} className="text-gray-500 hover:text-gray-700 rounded-full px-6">Cancel</Button>
                    <Button onClick={handleSchedule} disabled={!startDate || !endDate} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 shadow-md shadow-orange-500/20 flex-1">Book Now</Button>
                </div>
            </div>
          </div>
        </CardContent>
      </motion.div>
    </Card>
    </motion.div>
  );
};
