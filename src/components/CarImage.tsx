"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Car } from "@/lib/types";
import { getCarImageAlt, getCarImageUrl } from "@/lib/carImages";

interface CarImageProps {
  car: Pick<Car, "year" | "make" | "model" | "bodyStyle">;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function CarImage({ car, className, priority = false, sizes }: CarImageProps) {
  const primarySrc = useMemo(() => getCarImageUrl(car), [car]);
  const makeFallbackSrc = useMemo(() => {
    const params = new URLSearchParams({
      customer: "img",
      make: car.make.toLowerCase(),
      zoomType: "fullscreen",
    });
    return `https://cdn.imagin.studio/getimage?${params.toString()}`;
  }, [car.make]);

  const genericFallbackSrc = "https://cdn.imagin.studio/getimage?customer=img&zoomType=fullscreen";
  const [src, setSrc] = useState(primarySrc);
  const [fallbackStep, setFallbackStep] = useState(0);

  const handleError = () => {
    if (fallbackStep === 0) {
      setSrc(makeFallbackSrc);
      setFallbackStep(1);
      return;
    }

    if (fallbackStep === 1) {
      setSrc(genericFallbackSrc);
      setFallbackStep(2);
      return;
    }

    setSrc("/images/car-placeholder.svg");
  };

  return (
    <Image
      src={src}
      alt={getCarImageAlt(car)}
      fill
      priority={priority}
      sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
      className={className || "object-contain p-2"}
      onError={handleError}
    />
  );
}
