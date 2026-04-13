import { Car } from "@/lib/types";

type CarImageCar = Pick<Car, "year" | "make" | "model" | "bodyStyle">;

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function getCarImageUrl(car: CarImageCar): string {
  const params = new URLSearchParams({
    customer: "img",
    make: normalize(car.make),
    modelFamily: normalize(car.model),
    modelYear: String(car.year),
    zoomType: "fullscreen",
  });

  return `https://cdn.imagin.studio/getimage?${params.toString()}`;
}

export function getCarImageAlt(car: CarImageCar): string {
  return `${car.year} ${car.make} ${car.model}${car.bodyStyle ? ` ${car.bodyStyle}` : ""}`;
}
