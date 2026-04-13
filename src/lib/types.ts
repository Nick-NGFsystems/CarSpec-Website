export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string | null;
  cylinders: number | null;
  displacement: number | null;
  horsepower: number | null;
  torque: number | null;
  zeroToSixty: number | null;
  drivetrain: string | null;
  transmission: string | null;
  fuelType: string | null;
  cityMpg: number | null;
  highwayMpg: number | null;
  combinedMpg: number | null;
  bodyStyle: string | null;
  doors: number | null;
  seats: number | null;
  curbWeight: number | null;
  msrp: number | null;
}

export interface SearchFilters {
  query?: string;
  minHp?: number;
  maxHp?: number;
  minTorque?: number;
  maxTorque?: number;
  cylinders?: string;
  drivetrain?: string;
  fuelType?: string;
  bodyStyle?: string;
  transmission?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  maxZeroToSixty?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface AffiliateLink {
  name: string;
  url: string;
  color: string;
}