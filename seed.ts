import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cars = [
  // Sports Cars
  { make: "Ford", model: "Mustang", year: 2024, trim: "GT", cylinders: 8, displacement: 5.0, horsepower: 480, torque: 415, zeroToSixty: 4.1, drivetrain: "RWD", transmission: "manual", fuelType: "gasoline", cityMpg: 15, highwayMpg: 24, combinedMpg: 18, bodyStyle: "coupe", doors: 2, seats: 4, curbWeight: 3850, msrp: 42515 },
  { make: "Chevrolet", model: "Camaro", year: 2024, trim: "SS", cylinders: 8, displacement: 6.2, horsepower: 455, torque: 455, zeroToSixty: 4.0, drivetrain: "RWD", transmission: "manual", fuelType: "gasoline", cityMpg: 16, highwayMpg: 26, combinedMpg: 19, bodyStyle: "coupe", doors: 2, seats: 4, curbWeight: 3685, msrp: 44195 },
  { make: "Dodge", model: "Challenger", year: 2023, trim: "R/T Scat Pack", cylinders: 8, displacement: 6.4, horsepower: 485, torque: 475, zeroToSixty: 4.2, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 13, highwayMpg: 22, combinedMpg: 16, bodyStyle: "coupe", doors: 2, seats: 5, curbWeight: 4230, msrp: 46640 },
  { make: "Chevrolet", model: "Corvette", year: 2024, trim: "Stingray", cylinders: 8, displacement: 6.2, horsepower: 490, torque: 465, zeroToSixty: 2.9, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 16, highwayMpg: 24, combinedMpg: 19, bodyStyle: "coupe", doors: 2, seats: 2, curbWeight: 3637, msrp: 65895 },
  { make: "Porsche", model: "911", year: 2024, trim: "Carrera", cylinders: 6, displacement: 3.0, horsepower: 379, torque: 331, zeroToSixty: 3.8, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 18, highwayMpg: 24, combinedMpg: 20, bodyStyle: "coupe", doors: 2, seats: 4, curbWeight: 3354, msrp: 116550 },
  { make: "Nissan", model: "Z", year: 2024, trim: "Performance", cylinders: 6, displacement: 3.0, horsepower: 400, torque: 350, zeroToSixty: 3.9, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 19, highwayMpg: 28, combinedMpg: 22, bodyStyle: "coupe", doors: 2, seats: 2, curbWeight: 3536, msrp: 52990 },
  { make: "Toyota", model: "GR Supra", year: 2024, trim: "3.0", cylinders: 6, displacement: 3.0, horsepower: 382, torque: 368, zeroToSixty: 3.9, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 22, highwayMpg: 30, combinedMpg: 25, bodyStyle: "coupe", doors: 2, seats: 2, curbWeight: 3400, msrp: 56250 },
  { make: "BMW", model: "M4", year: 2024, trim: "Competition", cylinders: 6, displacement: 3.0, horsepower: 503, torque: 479, zeroToSixty: 3.4, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 16, highwayMpg: 23, combinedMpg: 19, bodyStyle: "coupe", doors: 2, seats: 4, curbWeight: 3830, msrp: 80895 },

  // Sedans
  { make: "Toyota", model: "Camry", year: 2024, trim: "SE", cylinders: 4, displacement: 2.5, horsepower: 203, torque: 184, zeroToSixty: 7.6, drivetrain: "FWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 28, highwayMpg: 39, combinedMpg: 32, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3310, msrp: 28855 },
  { make: "Honda", model: "Civic", year: 2024, trim: "Sport", cylinders: 4, displacement: 2.0, horsepower: 158, torque: 138, zeroToSixty: 8.2, drivetrain: "FWD", transmission: "CVT", fuelType: "gasoline", cityMpg: 31, highwayMpg: 38, combinedMpg: 34, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 2877, msrp: 25945 },
  { make: "Honda", model: "Accord", year: 2024, trim: "Sport", cylinders: 4, displacement: 1.5, horsepower: 192, torque: 192, zeroToSixty: 7.2, drivetrain: "FWD", transmission: "CVT", fuelType: "gasoline", cityMpg: 29, highwayMpg: 37, combinedMpg: 32, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3239, msrp: 31805 },
  { make: "Hyundai", model: "Sonata", year: 2024, trim: "SEL", cylinders: 4, displacement: 2.5, horsepower: 191, torque: 181, zeroToSixty: 7.5, drivetrain: "FWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 28, highwayMpg: 38, combinedMpg: 32, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3329, msrp: 29550 },
  { make: "BMW", model: "3 Series", year: 2024, trim: "330i", cylinders: 4, displacement: 2.0, horsepower: 255, torque: 295, zeroToSixty: 5.6, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 26, highwayMpg: 36, combinedMpg: 30, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3582, msrp: 44450 },
  { make: "Mercedes-Benz", model: "C-Class", year: 2024, trim: "C 300", cylinders: 4, displacement: 2.0, horsepower: 255, torque: 295, zeroToSixty: 5.9, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 25, highwayMpg: 35, combinedMpg: 29, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3649, msrp: 46150 },
  { make: "Honda", model: "Civic", year: 2024, trim: "Type R", cylinders: 4, displacement: 2.0, horsepower: 315, torque: 310, zeroToSixty: 4.9, drivetrain: "FWD", transmission: "manual", fuelType: "gasoline", cityMpg: 22, highwayMpg: 28, combinedMpg: 24, bodyStyle: "hatchback", doors: 4, seats: 5, curbWeight: 3118, msrp: 44890 },
  { make: "Subaru", model: "WRX", year: 2024, trim: "Premium", cylinders: 4, displacement: 2.4, horsepower: 271, torque: 258, zeroToSixty: 5.4, drivetrain: "AWD", transmission: "manual", fuelType: "gasoline", cityMpg: 19, highwayMpg: 26, combinedMpg: 22, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3394, msrp: 33265 },

  // SUVs
  { make: "Toyota", model: "RAV4", year: 2024, trim: "XLE", cylinders: 4, displacement: 2.5, horsepower: 203, torque: 184, zeroToSixty: 8.3, drivetrain: "AWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 27, highwayMpg: 34, combinedMpg: 30, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 3615, msrp: 32350 },
  { make: "Honda", model: "CR-V", year: 2024, trim: "EX-L", cylinders: 4, displacement: 1.5, horsepower: 190, torque: 179, zeroToSixty: 8.0, drivetrain: "AWD", transmission: "CVT", fuelType: "gasoline", cityMpg: 28, highwayMpg: 34, combinedMpg: 30, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 3532, msrp: 37350 },
  { make: "Jeep", model: "Wrangler", year: 2024, trim: "Rubicon", cylinders: 6, displacement: 3.6, horsepower: 285, torque: 260, zeroToSixty: 7.5, drivetrain: "4WD", transmission: "automatic", fuelType: "gasoline", cityMpg: 17, highwayMpg: 22, combinedMpg: 19, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 4626, msrp: 54285 },
  { make: "Ford", model: "Bronco", year: 2024, trim: "Badlands", cylinders: 4, displacement: 2.3, horsepower: 275, torque: 315, zeroToSixty: 7.2, drivetrain: "4WD", transmission: "automatic", fuelType: "gasoline", cityMpg: 18, highwayMpg: 22, combinedMpg: 20, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 4474, msrp: 44790 },
  { make: "BMW", model: "X5", year: 2024, trim: "xDrive40i", cylinders: 6, displacement: 3.0, horsepower: 375, torque: 398, zeroToSixty: 5.0, drivetrain: "AWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 21, highwayMpg: 27, combinedMpg: 23, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 4842, msrp: 67095 },
  { make: "Porsche", model: "Cayenne", year: 2024, trim: "S", cylinders: 8, displacement: 4.0, horsepower: 468, torque: 442, zeroToSixty: 4.5, drivetrain: "AWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 15, highwayMpg: 21, combinedMpg: 17, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 4850, msrp: 95650 },
  { make: "Tesla", model: "Model Y", year: 2024, trim: "Long Range", cylinders: 0, displacement: 0, horsepower: 384, torque: 375, zeroToSixty: 4.8, drivetrain: "AWD", transmission: "automatic", fuelType: "electric", cityMpg: 123, highwayMpg: 112, combinedMpg: 118, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 4398, msrp: 47990 },
  { make: "Mazda", model: "CX-5", year: 2024, trim: "Turbo", cylinders: 4, displacement: 2.5, horsepower: 256, torque: 320, zeroToSixty: 6.4, drivetrain: "AWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 22, highwayMpg: 27, combinedMpg: 24, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 3726, msrp: 39900 },

  // Trucks
  { make: "Ford", model: "F-150", year: 2024, trim: "XLT", cylinders: 6, displacement: 2.7, horsepower: 325, torque: 400, zeroToSixty: 6.1, drivetrain: "4WD", transmission: "automatic", fuelType: "gasoline", cityMpg: 18, highwayMpg: 23, combinedMpg: 20, bodyStyle: "truck", doors: 4, seats: 6, curbWeight: 4705, msrp: 44970 },
  { make: "Chevrolet", model: "Silverado 1500", year: 2024, trim: "LT", cylinders: 8, displacement: 5.3, horsepower: 355, torque: 383, zeroToSixty: 6.5, drivetrain: "4WD", transmission: "automatic", fuelType: "gasoline", cityMpg: 16, highwayMpg: 22, combinedMpg: 18, bodyStyle: "truck", doors: 4, seats: 6, curbWeight: 4930, msrp: 48600 },
  { make: "RAM", model: "1500", year: 2024, trim: "Big Horn", cylinders: 8, displacement: 5.7, horsepower: 395, torque: 410, zeroToSixty: 6.3, drivetrain: "4WD", transmission: "automatic", fuelType: "gasoline", cityMpg: 15, highwayMpg: 22, combinedMpg: 18, bodyStyle: "truck", doors: 4, seats: 6, curbWeight: 5200, msrp: 47105 },
  { make: "Toyota", model: "Tacoma", year: 2024, trim: "TRD Off-Road", cylinders: 4, displacement: 2.4, horsepower: 278, torque: 317, zeroToSixty: 6.8, drivetrain: "4WD", transmission: "automatic", fuelType: "gasoline", cityMpg: 19, highwayMpg: 24, combinedMpg: 21, bodyStyle: "truck", doors: 4, seats: 5, curbWeight: 4515, msrp: 41655 },
  { make: "Ford", model: "F-150", year: 2024, trim: "Raptor", cylinders: 6, displacement: 3.5, horsepower: 450, torque: 510, zeroToSixty: 5.2, drivetrain: "4WD", transmission: "automatic", fuelType: "gasoline", cityMpg: 14, highwayMpg: 18, combinedMpg: 16, bodyStyle: "truck", doors: 4, seats: 5, curbWeight: 5861, msrp: 76775 },
  { make: "Rivian", model: "R1T", year: 2024, trim: "Dual-Motor", cylinders: 0, displacement: 0, horsepower: 600, torque: 600, zeroToSixty: 3.5, drivetrain: "AWD", transmission: "automatic", fuelType: "electric", cityMpg: 80, highwayMpg: 68, combinedMpg: 74, bodyStyle: "truck", doors: 4, seats: 5, curbWeight: 6560, msrp: 75900 },

  // Electric Vehicles
  { make: "Tesla", model: "Model 3", year: 2024, trim: "Long Range", cylinders: 0, displacement: 0, horsepower: 346, torque: 389, zeroToSixty: 4.2, drivetrain: "AWD", transmission: "automatic", fuelType: "electric", cityMpg: 136, highwayMpg: 123, combinedMpg: 130, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3862, msrp: 42490 },
  { make: "Tesla", model: "Model S", year: 2024, trim: "Plaid", cylinders: 0, displacement: 0, horsepower: 1020, torque: 1050, zeroToSixty: 1.99, drivetrain: "AWD", transmission: "automatic", fuelType: "electric", cityMpg: 115, highwayMpg: 106, combinedMpg: 111, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 4766, msrp: 89990 },
  { make: "BMW", model: "i4", year: 2024, trim: "M50", cylinders: 0, displacement: 0, horsepower: 536, torque: 586, zeroToSixty: 3.3, drivetrain: "AWD", transmission: "automatic", fuelType: "electric", cityMpg: 95, highwayMpg: 100, combinedMpg: 97, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 4954, msrp: 69900 },
  { make: "Hyundai", model: "Ioniq 5", year: 2024, trim: "Limited", cylinders: 0, displacement: 0, horsepower: 320, torque: 446, zeroToSixty: 5.1, drivetrain: "AWD", transmission: "automatic", fuelType: "electric", cityMpg: 110, highwayMpg: 87, combinedMpg: 98, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 4562, msrp: 52600 },
  { make: "Ford", model: "Mustang Mach-E", year: 2024, trim: "GT", cylinders: 0, displacement: 0, horsepower: 480, torque: 634, zeroToSixty: 3.5, drivetrain: "AWD", transmission: "automatic", fuelType: "electric", cityMpg: 91, highwayMpg: 85, combinedMpg: 88, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 4994, msrp: 52995 },
  { make: "Porsche", model: "Taycan", year: 2024, trim: "4S", cylinders: 0, displacement: 0, horsepower: 537, torque: 479, zeroToSixty: 3.4, drivetrain: "AWD", transmission: "automatic", fuelType: "electric", cityMpg: 84, highwayMpg: 85, combinedMpg: 84, bodyStyle: "sedan", doors: 4, seats: 4, curbWeight: 5060, msrp: 109450 },

  // Hybrids
  { make: "Toyota", model: "Prius", year: 2024, trim: "XLE", cylinders: 4, displacement: 2.0, horsepower: 196, torque: 139, zeroToSixty: 7.0, drivetrain: "FWD", transmission: "CVT", fuelType: "hybrid", cityMpg: 57, highwayMpg: 53, combinedMpg: 55, bodyStyle: "hatchback", doors: 4, seats: 5, curbWeight: 3053, msrp: 32975 },
  { make: "Honda", model: "Accord Hybrid", year: 2024, trim: "Sport", cylinders: 4, displacement: 2.0, horsepower: 204, torque: 247, zeroToSixty: 7.3, drivetrain: "FWD", transmission: "CVT", fuelType: "hybrid", cityMpg: 51, highwayMpg: 44, combinedMpg: 48, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3428, msrp: 34490 },
  { make: "Toyota", model: "RAV4 Prime", year: 2024, trim: "XSE", cylinders: 4, displacement: 2.5, horsepower: 302, torque: 199, zeroToSixty: 5.7, drivetrain: "AWD", transmission: "CVT", fuelType: "hybrid", cityMpg: 94, highwayMpg: 84, combinedMpg: 38, bodyStyle: "SUV", doors: 4, seats: 5, curbWeight: 4235, msrp: 44340 },

  // Luxury/Performance Sedans
  { make: "BMW", model: "M3", year: 2024, trim: "Competition", cylinders: 6, displacement: 3.0, horsepower: 503, torque: 479, zeroToSixty: 3.4, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 16, highwayMpg: 23, combinedMpg: 19, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3840, msrp: 78795 },
  { make: "Mercedes-Benz", model: "AMG C 63", year: 2024, trim: "S E Performance", cylinders: 4, displacement: 2.0, horsepower: 671, torque: 752, zeroToSixty: 3.3, drivetrain: "AWD", transmission: "automatic", fuelType: "hybrid", cityMpg: 20, highwayMpg: 25, combinedMpg: 22, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 4685, msrp: 83050 },
  { make: "Audi", model: "RS 5", year: 2024, trim: "Sportback", cylinders: 6, displacement: 2.9, horsepower: 444, torque: 443, zeroToSixty: 3.6, drivetrain: "AWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 18, highwayMpg: 25, combinedMpg: 21, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 4123, msrp: 79395 },
  { make: "Genesis", model: "G70", year: 2024, trim: "3.3T Sport", cylinders: 6, displacement: 3.3, horsepower: 365, torque: 376, zeroToSixty: 4.5, drivetrain: "AWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 17, highwayMpg: 25, combinedMpg: 20, bodyStyle: "sedan", doors: 4, seats: 5, curbWeight: 3887, msrp: 48600 },

  // Supercars/Exotics
  { make: "Lamborghini", model: "Huracan", year: 2024, trim: "Tecnica", cylinders: 10, displacement: 5.2, horsepower: 631, torque: 417, zeroToSixty: 2.9, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 13, highwayMpg: 18, combinedMpg: 15, bodyStyle: "coupe", doors: 2, seats: 2, curbWeight: 3313, msrp: 238295 },
  { make: "Ferrari", model: "296 GTB", year: 2024, trim: "Assetto Fiorano", cylinders: 6, displacement: 3.0, horsepower: 819, torque: 546, zeroToSixty: 2.8, drivetrain: "RWD", transmission: "automatic", fuelType: "hybrid", cityMpg: 15, highwayMpg: 19, combinedMpg: 17, bodyStyle: "coupe", doors: 2, seats: 2, curbWeight: 3296, msrp: 351750 },
  { make: "McLaren", model: "750S", year: 2024, trim: "Coupe", cylinders: 8, displacement: 4.0, horsepower: 740, torque: 590, zeroToSixty: 2.7, drivetrain: "RWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 15, highwayMpg: 22, combinedMpg: 18, bodyStyle: "coupe", doors: 2, seats: 2, curbWeight: 3042, msrp: 324850 },

  // Economy/Compact
  { make: "Mazda", model: "Mazda3", year: 2024, trim: "2.5 Turbo", cylinders: 4, displacement: 2.5, horsepower: 250, torque: 320, zeroToSixty: 5.8, drivetrain: "AWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 23, highwayMpg: 32, combinedMpg: 27, bodyStyle: "hatchback", doors: 4, seats: 5, curbWeight: 3326, msrp: 35350 },
  { make: "Volkswagen", model: "Golf R", year: 2024, trim: "Base", cylinders: 4, displacement: 2.0, horsepower: 315, torque: 295, zeroToSixty: 4.6, drivetrain: "AWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 23, highwayMpg: 30, combinedMpg: 26, bodyStyle: "hatchback", doors: 4, seats: 5, curbWeight: 3417, msrp: 46070 },
  { make: "Toyota", model: "GR Corolla", year: 2024, trim: "Core", cylinders: 3, displacement: 1.6, horsepower: 300, torque: 273, zeroToSixty: 4.9, drivetrain: "AWD", transmission: "manual", fuelType: "gasoline", cityMpg: 21, highwayMpg: 28, combinedMpg: 24, bodyStyle: "hatchback", doors: 4, seats: 5, curbWeight: 3249, msrp: 36100 },

  // Minivan
  { make: "Honda", model: "Odyssey", year: 2024, trim: "Touring", cylinders: 6, displacement: 3.5, horsepower: 280, torque: 262, zeroToSixty: 6.8, drivetrain: "FWD", transmission: "automatic", fuelType: "gasoline", cityMpg: 19, highwayMpg: 28, combinedMpg: 22, bodyStyle: "wagon", doors: 4, seats: 8, curbWeight: 4613, msrp: 49890 },
  { make: "Toyota", model: "Sienna", year: 2024, trim: "XSE", cylinders: 4, displacement: 2.5, horsepower: 245, torque: 176, zeroToSixty: 7.5, drivetrain: "AWD", transmission: "CVT", fuelType: "hybrid", cityMpg: 36, highwayMpg: 36, combinedMpg: 36, bodyStyle: "wagon", doors: 4, seats: 8, curbWeight: 4690, msrp: 46090 },
];

async function main() {
  console.log("Seeding database with car data...");

  for (const car of cars) {
    await prisma.car.upsert({
      where: {
        make_model_year_trim: {
          make: car.make,
          model: car.model,
          year: car.year,
          trim: car.trim ?? "",
        },
      },
      update: car,
      create: car,
    });
  }

  console.log(`Seeded ${cars.length} cars successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
