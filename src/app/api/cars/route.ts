import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const where: Prisma.CarWhereInput = {};

  const query = params.get("query");
  if (query) {
    where.OR = [
      { make: { contains: query, mode: "insensitive" } },
      { model: { contains: query, mode: "insensitive" } },
      { trim: { contains: query, mode: "insensitive" } },
    ];
  }

  const minHp = params.get("minHp"); const maxHp = params.get("maxHp");
  if (minHp || maxHp) { where.horsepower = {}; if (minHp) (where.horsepower as Prisma.IntNullableFilter).gte = parseInt(minHp); if (maxHp) (where.horsepower as Prisma.IntNullableFilter).lte = parseInt(maxHp); }

  const maxZeroToSixty = params.get("maxZeroToSixty");
  if (maxZeroToSixty) { where.zeroToSixty = { lte: parseFloat(maxZeroToSixty) }; }

  const cylinders = params.get("cylinders"); if (cylinders) { where.cylinders = parseInt(cylinders); }
  const drivetrain = params.get("drivetrain"); if (drivetrain) { where.drivetrain = drivetrain; }
  const fuelType = params.get("fuelType"); if (fuelType) { where.fuelType = fuelType; }
  const bodyStyle = params.get("bodyStyle"); if (bodyStyle) { where.bodyStyle = bodyStyle; }
  const transmission = params.get("transmission"); if (transmission) { where.transmission = transmission; }

  const minPrice = params.get("minPrice"); const maxPrice = params.get("maxPrice");
  if (minPrice || maxPrice) { where.msrp = {}; if (minPrice) (where.msrp as Prisma.IntNullableFilter).gte = parseInt(minPrice); if (maxPrice) (where.msrp as Prisma.IntNullableFilter).lte = parseInt(maxPrice); }

  const sortBy = params.get("sortBy") || "horsepower";
  const sortOrder = params.get("sortOrder") || "desc";
  const orderBy: Prisma.CarOrderByWithRelationInput = { [sortBy]: sortOrder as Prisma.SortOrder };

  try {
    const cars = await prisma.car.findMany({ where, orderBy, take: 50 });
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search cars" }, { status: 500 });
  }
}