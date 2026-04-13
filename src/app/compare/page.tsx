"use client";
import { useState, useEffect } from "react";
import { Car } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CarImage from "@/components/CarImage";

const SPECS = [
  { key: "year", label: "Year" }, { key: "trim", label: "Trim" }, { key: "bodyStyle", label: "Body Style" },
  { key: "horsepower", label: "Horsepower", hi: true }, { key: "torque", label: "Torque", hi: true },
  { key: "zeroToSixty", label: "0–60 mph", hi: true, lo: true }, { key: "cylinders", label: "Cylinders" },
  { key: "drivetrain", label: "Drivetrain" }, { key: "transmission", label: "Transmission" }, { key: "fuelType", label: "Fuel Type" },
  { key: "cityMpg", label: "City MPG" }, { key: "highwayMpg", label: "Hwy MPG" }, { key: "combinedMpg", label: "Combined MPG", hi: true },
  { key: "curbWeight", label: "Curb Weight" }, { key: "msrp", label: "MSRP", hi: true },
];

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = searchParams.get("ids")?.split(",").filter(Boolean) || [];
    if (!ids.length) { setLoading(false); return; }
    fetch("/api/cars?").then(r => r.json()).then((all: Car[]) => { setCars(all.filter(c => ids.includes(c.id))); setLoading(false); });
  }, [searchParams]);

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-16 text-center"><p className="text-slate-400">Loading...</p></div>;
  if (cars.length < 2) return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900 mb-3">Compare Cars Side by Side</h1>
      <p className="text-slate-500 mb-6">Select 2–3 cars from the search page to compare.</p>
      <Link href="/" className="inline-flex px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Go to Search</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-6">← Back to search</Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Side-by-Side Comparison</h1>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-800 to-slate-700">
                <th className="text-left px-5 py-4 text-sm font-medium text-slate-400 w-40">Spec</th>
                {cars.map(car => (
                  <th key={car.id} className="text-center px-5 py-4 min-w-[180px]">
                    <Link href={"/car/" + car.id} className="hover:text-blue-300 transition-colors">
                      <div className="relative h-20 rounded-lg overflow-hidden border border-slate-600/60 mb-3 bg-slate-700/50">
                        <CarImage car={car} className="object-contain p-1" sizes="200px" />
                      </div>
                      <p className="text-xs text-slate-400">{car.year}</p>
                      <p className="text-lg font-bold text-white">{car.make} {car.model}</p>
                      {car.trim && <p className="text-sm text-slate-300">{car.trim}</p>}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SPECS.map(row => {
                const vals = cars.map(c => (c as Record<string,unknown>)[row.key] as number);
                const nums = vals.filter(v => v != null);
                const best = row.hi && nums.length ? (row.lo ? Math.min(...nums) : Math.max(...nums)) : null;
                return (
                  <tr key={row.key} className="hover:bg-slate-50">
                    <td className="px-5 py-3 text-sm text-slate-500 font-medium">{row.label}</td>
                    {cars.map(car => {
                      const v = (car as Record<string,unknown>)[row.key];
                      const isBest = row.hi && v != null && v === best;
                      return (
                        <td key={car.id} className={"px-5 py-3 text-sm text-center font-medium capitalize " + (isBest ? "text-emerald-600 font-bold" : "text-slate-900")}>
                          {v != null ? String(v) : "—"}{isBest ? <span className="ml-1 text-[10px] text-emerald-500 font-normal">BEST</span> : null}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}