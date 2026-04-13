import { AffiliateLink } from "./types";

export function getAffiliateLinks(make: string, model: string, year: number): AffiliateLink[] {
  const searchQuery = encodeURIComponent(`${year} ${make} ${model}`);
  return [
    { name: "CarGurus", url: `https://www.cargurus.com/Cars/inventorylisting/viewDetailsFilterViewInventoryListing.action?searchQuery=${searchQuery}`, color: "bg-green-600 hover:bg-green-700" },
    { name: "AutoTrader", url: `https://www.autotrader.com/cars-for-sale/all-cars?searchRadius=50&makeCodeList=${encodeURIComponent(make)}&modelCodeList=${encodeURIComponent(model)}&startYear=${year}&endYear=${year}`, color: "bg-orange-500 hover:bg-orange-600" },
    { name: "TrueCar", url: `https://www.truecar.com/used-cars-for-sale/listings/${make.toLowerCase()}/${model.toLowerCase()}/year-${year}/`, color: "bg-blue-700 hover:bg-blue-800" },
    { name: "Cars.com", url: `https://www.cars.com/shopping/results/?keyword=${searchQuery}`, color: "bg-purple-600 hover:bg-purple-700" },
  ];
}