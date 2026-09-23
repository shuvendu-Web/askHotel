"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface StackingNavbarItemType {
  label: string;
  icon: LucideIcon;
}

const StackingNavbar = ({ items }: { items: StackingNavbarItemType[] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="flex items-center gap-x-0 sm:gap-x-2"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {items.map((item, index) => (
        <StackingNavbarItem
          expanded={expanded}
          key={index}
          index={index}
        >
          <item.icon className="w-3.5 h-3.5 mr-1.5 text-orange-400 group-hover:text-orange-600 transition-colors" />
          {item.label}
        </StackingNavbarItem>
      ))}
    </div>
  );
};

const StackingNavbarItem = ({
  children,
  style,
  expanded,
  index,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  expanded: boolean;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ x: -80 * index }}
      animate={{ x: expanded ? 0 : -80 * index }}
      transition={{
        duration: 0.6,
        ease: "circInOut",
        delay: 0.05 * index,
        type: "spring",
      }}
      style={{ zIndex: 100 - index }}
      className="relative"
    >
      <button
        className="flex items-center whitespace-nowrap text-xs font-medium px-4 py-1.5 rounded-full border border-gray-200 bg-white/60 no-underline text-gray-600 backdrop-blur-sm hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 ease-in-out group"
        style={style}
      >
        {children}
      </button>
    </motion.div>
  );
};

export { StackingNavbar };
