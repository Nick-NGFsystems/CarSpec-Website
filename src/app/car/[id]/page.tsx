import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getAffiliateLinks } from "@/lib/affiliates";
import Link from "next/link";
import CarImage from "@/components/CarImage";

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();
  const links = getAffiliateLinks(car.make, car.model, car.year);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-6">← Back to search</Link>
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl px-8 py-8 mb-8">
        <p className="text-sm text-slate-400">{car.year}</p>
        <h1 className="text-3xl font-bold text-white mt-1">{car.make} {car.model}</h1>
        {car.trim && <p className="text-lg text-slate-300 mt-1">{car.trim}</p>}
        {car.msrp && <p className="text-2xl font-bold text-emerald-400 mt-4">${car.msrp.toLocaleString()} <span className="text-sm font-normal text-slate-400">MSRP</span></p>}
      </div>
      <div className="relative h-72 sm:h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm mb-8 bg-slate-100">
        <CarImage car={car} priority className="object-contain p-3" sizes="(max-width: 768px) 100vw, 1024px" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[["Horsepower", car.horsepower, " hp"],["Torque", car.torque, " lb-ft"],["0–60 mph", car.zeroToSixty, "s"],["Combined MPG", car.combinedMpg, car.fuelType === "electric" ? " MPGe" : " mpg"]].map(([label, value, suffix]) => (
          <div key={String(label)} className="bg-white rounded-xl shadow-sm border border-slate-200 px-4 py-5 text-center">
            <p className="text-2xl font-bold text-slate-900">{value != null ? `${value}${suffix}` : "—"}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-100"><h2 className="text-lg font-semibold text-slate-900">Full Specifications</h2></div>
        <div className="divide-y divide-slate-100">
          {[["Make",car.make],["Model",car.model],["Year",String(car.year)],["Trim",car.trim],["Body Style",car.bodyStyle],["Doors",car.doors?.toString()],["Seats",car.seats?.toString()],["Cylinders",car.cylinders===0?"Electric Motor":car.cylinders?.toString()],["Displacement",car.displacement?car.displacement+"L":null],["Horsepower",car.horsepower?car.horsepower+" hp":null],["Torque",car.torque?car.torque+" lb-ft":null],["0–60 mph",car.zeroToSixty?car.zeroToSixty+" seconds":null],["Drivetrain",car.drivetrain],["Transmission",car.transmission],["Fuel Type",car.fuelType],["City MPG",car.cityMpg?.toString()],["Hwy MPG",car.highwayMpg?.toString()],["Combined MPG",car.combinedMpg?.toString()],["Curb Weight",car.curbWeight?car.curbWeight.toLocaleString()+" lbs":null]].map(([label, value]) => (
            <div key={String(label)} className="flex items-center justify-between px-6 py-3">
              <span className="text-sm text-slate-500">{label}</span>
              <span className="text-sm font-medium text-slate-900 capitalize">{value || "—"}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Find This Car for Sale</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {links.map(link => <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer nofollow" className={link.color + " text-white text-center py-3 px-4 rounded-lg text-sm font-medium transition-colors"}>{link.name}</a>)}
        </div>
        <p className="text-[10px] text-slate-400 mt-3">Links may contain affiliate tracking.</p>
      </div>
    </div>
  );
}