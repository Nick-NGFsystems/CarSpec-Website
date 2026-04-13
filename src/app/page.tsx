"use client";
import { useState, useEffect, useCallback } from "react";
import { Car, SearchFilters } from "@/lib/types";
import FilterPanel from "@/components/FilterPanel";
import CarCard from "@/components/CarCard";
import SortBar from "@/components/SortBar";
import Link from "next/link";

const DEFAULT_FILTERS: SearchFilters = { sortBy: "horsepower", sortOrder: "desc" };

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<Car[]>([]);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v !== undefined && v !== "") params.set(k, String(v)); });
    try {
      const res = await fetch("/api/cars?" + params.toString());
      setCars(await res.json());
    } catch (e) { console.error(e); } finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { const t = setTimeout(fetchCars, 300); return () => clearTimeout(t); }, [fetchCars]);

  const handleCompare = (car: Car) => {
    setCompareList((prev) => {
      if (prev.find((c) => c.id === car.id)) return prev.filter((c) => c.id !== car.id);
      if (prev.length >= 3) return prev;
      return [...prev, car];
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Find Cars by the <span className="text-blue-600">Numbers</span></h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Filter by horsepower, torque, 0–60 time, drivetrain, and more. Stop browsing by brand — search by performance.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-80 lg:flex-shrink-0">
          <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
        </aside>
        <div className="flex-1 space-y-4">
          <SortBar count={cars.length} sortBy={filters.sortBy || "horsepower"} sortOrder={filters.sortOrder || "desc"} onSortChange={(sortBy, sortOrder) => setFilters((f) => ({ ...f, sortBy, sortOrder }))} />
          {compareList.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center justify-between">
              <p className="text-sm text-amber-800"><span className="font-semibold">{compareList.length}/3</span> cars selected</p>
              <div className="flex gap-2">
                <button onClick={() => setCompareList([])} className="text-xs text-amber-600 hover:text-amber-800 font-medium">Clear</button>
                {compareList.length >= 2 && <Link href={"/compare?ids=" + compareList.map((c) => c.id).join(",")} className="text-xs bg-amber-600 text-white px-3 py-1 rounded-lg hover:bg-amber-700 font-medium">Compare Now</Link>}
              </div>
            </div>
          )}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 h-64 animate-pulse"><div className="bg-slate-200 h-20 rounded-t-xl" /></div>)}
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-16"><p className="text-lg text-slate-400">No cars match those filters.</p><button onClick={() => setFilters(DEFAULT_FILTERS)} className="mt-3 text-sm text-blue-600 font-medium">Reset filters</button></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cars.map((car) => <CarCard key={car.id} car={car} onCompare={handleCompare} isComparing={!!compareList.find((c) => c.id === car.id)} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}