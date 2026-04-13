"use client";

interface SortBarProps {
  count: number; sortBy: string; sortOrder: "asc" | "desc";
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
}

const SORT_OPTIONS = [
  { value: "horsepower", label: "Horsepower" }, { value: "torque", label: "Torque" },
  { value: "zeroToSixty", label: "0–60 Time" }, { value: "msrp", label: "Price" },
  { value: "combinedMpg", label: "MPG" }, { value: "year", label: "Year" },
];

export default function SortBar({ count, sortBy, sortOrder, onSortChange }: SortBarProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-slate-200 px-5 py-3">
      <p className="text-sm text-slate-600"><span className="font-semibold text-slate-900">{count}</span> cars found</p>
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-500">Sort by</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value, sortOrder)} className="text-sm border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <button onClick={() => onSortChange(sortBy, sortOrder === "asc" ? "desc" : "asc")} className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <svg className={`w-4 h-4 text-slate-500 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
}