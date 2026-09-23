"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

interface CardData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

interface ArcFlowCarouselProps {
  radiusRatio?: number;
  cardRatio?: number;
  maxCardWidth?: number;
  cardAspect?: number;
  overlap?: number;
  arcOffset?: number;
  smoothing?: number;
  dragSensitivity?: number;
  momentum?: number;
  snap?: boolean;
  wheelControl?: "horizontal" | "vertical";
  autoRotateSpeed?: number;
  pauseOnHover?: boolean;
  surfaceColor?: string;
  cards?: CardData[];
}

const DEFAULT_CARDS: CardData[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=640&q=80",
    title: "Grand Horizon",
    subtitle: "Luxury Suite · Ocean View",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=640&q=80",
    title: "Azure Retreat",
    subtitle: "Penthouse · Private Pool",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=640&q=80",
    title: "The Palms",
    subtitle: "Villa · Beachfront",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=640&q=80",
    title: "Skyline Haven",
    subtitle: "Sky Suite · City View",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=640&q=80",
    title: "Pearl Resort",
    subtitle: "Deluxe Room · Garden View",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1549294413-26f195200c16?w=640&q=80",
    title: "Serene Valley",
    subtitle: "Chalet · Mountain View",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1455587734955-081b22074882?w=640&q=80",
    title: "Lumière Palace",
    subtitle: "Heritage Suite · City Centre",
  },
];

export default function ArcFlowCarousel({
  radiusRatio = 0.85,
  cardRatio = 0.21,
  maxCardWidth = 320,
  cardAspect = 0.62,
  overlap = -0.04,
  arcOffset = 0.5,
  smoothing = 5.5,
  dragSensitivity = 1.2,
  momentum = 1,
  snap = false,
  wheelControl = "horizontal",
  autoRotateSpeed = 0.12,
  pauseOnHover = true,
  surfaceColor = "#000000",
  cards = DEFAULT_CARDS,
}: ArcFlowCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(900);
  const [angle, setAngle] = useState(0);
  const targetAngle = useRef(0);
  const currentAngle = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const rafId = useRef<number>(0);
  const isHovered = useRef(false);
  const autoRotateRef = useRef(autoRotateSpeed);

  useEffect(() => {
    autoRotateRef.current = autoRotateSpeed;
  }, [autoRotateSpeed]);

  useEffect(() => {
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setContainerWidth(e.contentRect.width);
      }
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const cardWidth = Math.min(containerWidth * cardRatio, maxCardWidth);
  const cardHeight = cardWidth / cardAspect;
  const radius = containerWidth * radiusRatio * 0.5;
  const count = cards.length;
  const angleStep = (2 * Math.PI) / count;

  const animate = useCallback(() => {
    if (!isDragging.current) {
      if (!pauseOnHover || !isHovered.current) {
        targetAngle.current += autoRotateRef.current * 0.01;
      }
      velocity.current *= 0.92;
      targetAngle.current += velocity.current;
    }

    const diff = targetAngle.current - currentAngle.current;
    currentAngle.current += diff / smoothing;
    setAngle(currentAngle.current);

    rafId.current = requestAnimationFrame(animate);
  }, [smoothing, pauseOnHover]);

  useEffect(() => {
    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [animate]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    velocity.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    const delta = (dx / containerWidth) * dragSensitivity * Math.PI;
    targetAngle.current += delta;
    velocity.current = delta * momentum;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  const onWheel = (e: React.WheelEvent) => {
    const delta =
      wheelControl === "horizontal" ? e.deltaX || e.deltaY : e.deltaY;
    targetAngle.current += (delta / containerWidth) * dragSensitivity * Math.PI;
    e.preventDefault();
  };

  const computedCards = useMemo(() => {
    return cards.map((card, i) => {
      const baseAngle = i * angleStep - angle + Math.PI * arcOffset;
      const x = Math.sin(baseAngle) * radius;
      const z = Math.cos(baseAngle) * radius;
      // Normalise z to [0,1] for scale/opacity
      const zNorm = (z + radius) / (2 * radius);
      const scale = 0.6 + zNorm * 0.45;
      const opacity = 0.35 + zNorm * 0.65;
      const brightness = 50 + zNorm * 50;
      return { ...card, x, z, scale, opacity, brightness, zIndex: Math.round(zNorm * 100) };
    });
  }, [cards, angle, angleStep, radius, arcOffset]);

  const centerX = containerWidth / 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden"
      style={{
        height: cardHeight + 80,
        background: surfaceColor,
        cursor: isDragging.current ? "grabbing" : "grab",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* Surface reflection gradient */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: 60,
          background: `linear-gradient(to top, ${surfaceColor}, transparent)`,
          zIndex: 200,
        }}
      />

      {computedCards.map((card) => {
        const left = centerX + card.x - cardWidth / 2;
        const top = (cardHeight + 80) / 2 - cardHeight / 2;

        return (
          <div
            key={card.id}
            className="absolute overflow-hidden rounded-2xl shadow-2xl"
            style={{
              width: cardWidth,
              height: cardHeight,
              left,
              top,
              zIndex: card.zIndex,
              opacity: card.opacity,
              transform: `scale(${card.scale})`,
              transformOrigin: "center center",
              transition: "none",
              filter: `brightness(${card.brightness}%)`,
              willChange: "transform, opacity, left",
            }}
          >
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover"
              draggable={false}
            />
              {/* Card overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-sm font-semibold text-white drop-shadow">
                {card.title}
              </p>
              <p className="text-xs text-white/70">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
