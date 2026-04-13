"use client";
import { Car } from "@/lib/types";
import Link from "next/link";

interface CarCardProps { car: Car; onCompare?: (car: Car) => void; isComparing?: boolean; }

function formatPrice(price: number | null) { if (!price) return "N/A"; return "$" + price.toLocaleString(); }

function SpecBadge({ label, value, suffix = "" }: { label: string; value: number | null; suffix?: string; }) {
  return (
    <div className="bg-white px-3 py-2.5 text-center">
      <p className="text-lg font-bold text-slate-900">{value != null ? value + suffix : "—"}</p>
      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="px-2 py-0.5 text-[11px] font-medium text-slate-500 bg-slate-100 rounded capitalize">{children}</span>;
}

export default function CarCard({ car, onCompare, isComparing }: CarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-5 py-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">{car.year}</p>
            <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
            {car.trim && <p className="text-sm text-slate-300">{car.trim}</p>}
          </div>
          <span className="text-sm font-semibold text-emerald-400">{formatPrice(car.msrp)}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-px bg-slate-100">
        <SpecBadge label="HP" value={car.horsepower} />
        <SpecBadge label="Torque" value={car.torque} suffix=" lb-ft" />
        <SpecBadge label="0-60" value={car.zeroToSixty} suffix="s" />
      </div>
      <div className="px-5 py-4 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {car.drivetrain && <Tag>{car.drivetrain}</Tag>}
          {car.transmission && <Tag>{car.transmission}</Tag>}
          {car.fuelType && <Tag>{car.fuelType}</Tag>}
          {car.bodyStyle && <Tag>{car.bodyStyle}</Tag>}
          {car.cylinders !== null && car.cylinders > 0 && <Tag>{car.cylinders}cyl</Tag>}
          {car.cylinders === 0 && <Tag>EV</Tag>}
        </div>
        {car.combinedMpg && (
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span>{car.fuelType === "electric" ? "MPGe" : "MPG"}: {car.cityMpg} city / {car.highwayMpg} hwy / {car.combinedMpg} combined</span>
          </div>
        )}
        <div className="flex gap-2 pt-1">
          <Link href={"/car/" + car.id} className="flex-1 text-center py-2 px-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">View Specs</Link>
          {onCompare && (
            <button onClick={() => onCompare(car)} className={"py-2 px-3 text-sm font-medium rounded-lg border transition-colors " + (isComparing ? "bg-amber-50 text-amber-700 border-amber-300" : "text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600")}>
              {isComparing ? "Added" : "Compare"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}