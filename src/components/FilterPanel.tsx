"use client";
import { SearchFilters } from "@/lib/types";

interface FilterPanelProps { filters: SearchFilters; onChange: (filters: SearchFilters) => void; onReset: () => void; }

const DRIVETRAINS = ["FWD","RWD","AWD","4WD"];
const FUEL_TYPES = ["gasoline","diesel","electric","hybrid"];
const BODY_STYLES = ["sedan","coupe","SUV","truck","hatchback","wagon","convertible"];
const TRANSMISSIONS = ["automatic","manual","CVT"];
const CYLINDER_OPTIONS = ["0","3","4","6","8","10","12"];

export default function FilterPanel({ filters, onChange, onReset }: FilterPanelProps) {
  const update = (partial: Partial<SearchFilters>) => onChange({ ...filters, ...partial });
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
        <button onClick={onReset} className="text-xs text-blue-600 hover:text-blue-800 font-medium">Reset all</button>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Make / Model</label>
        <input type="text" placeholder="e.g. Toyota, Mustang..." value={filters.query || ""} onChange={(e) => update({ query: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Horsepower: {filters.minHp || 0} – {filters.maxHp || "1000+"}</label>
        <div className="flex gap-2">
          <input type="range" min={0} max={1200} step={25} value={filters.minHp || 0} onChange={(e) => update({ minHp: parseInt(e.target.value) || undefined })} className="flex-1" />
          <input type="range" min={0} max={1200} step={25} value={filters.maxHp || 1200} onChange={(e) => { const v = parseInt(e.target.value); update({ maxHp: v >= 1200 ? undefined : v }); }} className="flex-1" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">0–60 mph: under {filters.maxZeroToSixty || "any"}s</label>
        <input type="range" min={1.5} max={12} step={0.5} value={filters.maxZeroToSixty || 12} onChange={(e) => { const v = parseFloat(e.target.value); update({ maxZeroToSixty: v >= 12 ? undefined : v }); }} className="w-full" />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Max Price: {filters.maxPrice ? "$" + (filters.maxPrice/1000).toFixed(0) + "k" : "Any"}</label>
        <input type="range" min={20000} max={400000} step={5000} value={filters.maxPrice || 400000} onChange={(e) => { const v = parseInt(e.target.value); update({ maxPrice: v >= 400000 ? undefined : v }); }} className="w-full" />
      </div>
      {[
        { label: "Body Style", key: "bodyStyle", opts: BODY_STYLES },
        { label: "Drivetrain", key: "drivetrain", opts: DRIVETRAINS },
        { label: "Fuel Type", key: "fuelType", opts: FUEL_TYPES },
        { label: "Transmission", key: "transmission", opts: TRANSMISSIONS },
      ].map(({ label, key, opts }) => (
        <div key={key}>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">{label}</label>
          <div className="flex flex-wrap gap-1.5">
            {opts.map((o) => (
              <button key={o} onClick={() => update({ [key]: (filters as Record<string,unknown>)[key] === o ? undefined : o })}
                className={"px-2.5 py-1 text-xs rounded-full border transition-colors capitalize " + ((filters as Record<string,unknown>)[key] === o ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300")}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1.5">Cylinders</label>
        <div className="flex flex-wrap gap-1.5">
          {CYLINDER_OPTIONS.map((c) => (
            <button key={c} onClick={() => update({ cylinders: filters.cylinders === c ? undefined : c })}
              className={"px-2.5 py-1 text-xs rounded-full border transition-colors " + (filters.cylinders === c ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300")}>
              {c === "0" ? "EV" : c + "cyl"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}