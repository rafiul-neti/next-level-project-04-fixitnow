import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import config from "../src/config";

// Config
const SALT_ROUNDS = Number(config.bcrypt_salt_rounds);
const SEED_PASSWORD = config.seed_password!;

// Reference data

const CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Painting",
  "Carpentry",
  "Appliance Repair",
  "Pest Control",
  "HVAC",
] as const;

// A few services per category
const SERVICES_BY_CATEGORY: Record<
  (typeof CATEGORIES)[number],
  { name: string; description: string }[]
> = {
  Plumbing: [
    {
      name: "Pipe Leak Repair",
      description: "Fix leaking or burst pipes under sinks, walls, or floors.",
    },
    {
      name: "Drain Cleaning",
      description:
        "Clear clogged drains in kitchens, bathrooms, and laundry areas.",
    },
    {
      name: "Faucet Installation",
      description: "Install or replace kitchen and bathroom faucets.",
    },
  ],
  Electrical: [
    {
      name: "Wiring Inspection",
      description:
        "Full inspection of household wiring for safety and code compliance.",
    },
    {
      name: "Switch & Socket Repair",
      description: "Repair or replace faulty switches, sockets, and outlets.",
    },
    {
      name: "Ceiling Fan Installation",
      description: "Mount and wire new ceiling fans.",
    },
  ],
  Cleaning: [
    {
      name: "Deep House Cleaning",
      description: "Full top-to-bottom cleaning of an entire home.",
    },
    {
      name: "Move-in/Move-out Cleaning",
      description: "Thorough cleaning before moving in or after moving out.",
    },
    {
      name: "Sofa & Carpet Cleaning",
      description: "Steam cleaning for upholstery and carpets.",
    },
  ],
  Painting: [
    {
      name: "Interior Wall Painting",
      description: "Fresh coat of paint for interior rooms and walls.",
    },
    {
      name: "Exterior House Painting",
      description: "Weatherproof paint job for exterior walls and fences.",
    },
  ],
  Carpentry: [
    {
      name: "Furniture Repair",
      description: "Repair broken chairs, tables, cabinets, and doors.",
    },
    {
      name: "Custom Shelving",
      description: "Design and install custom shelves and storage units.",
    },
  ],
  "Appliance Repair": [
    {
      name: "Refrigerator Repair",
      description: "Diagnose and repair fridge cooling and compressor issues.",
    },
    {
      name: "Washing Machine Repair",
      description: "Fix drainage, spin, and motor issues in washing machines.",
    },
  ],
  "Pest Control": [
    {
      name: "General Pest Treatment",
      description:
        "Treatment for common household pests like ants and roaches.",
    },
    {
      name: "Termite Inspection",
      description: "Inspection and treatment plan for termite infestations.",
    },
  ],
  HVAC: [
    {
      name: "AC Servicing",
      description: "Routine cleaning and gas check for split and window ACs.",
    },
    {
      name: "AC Installation",
      description: "Full installation of new air conditioning units.",
    },
  ],
};

const TECHNICIAN_SEED = [
  {
    name: "Karim Uddin",
    email: "karim.tech@example.com",
    categories: ["Plumbing"],
    areas: ["Naogaon", "Rajshahi"],
    hourlyRate: 350,
    experienceYears: 5,
    bio: "Licensed plumber with 5 years of residential experience.",
  },
  {
    name: "Rafiqul Islam",
    email: "rafiqul.tech@example.com",
    categories: ["Plumbing", "HVAC"],
    areas: ["Rajshahi"],
    hourlyRate: 420,
    experienceYears: 8,
    bio: "Plumbing and HVAC specialist for homes and small offices.",
  },
  {
    name: "Nasrin Akter",
    email: "nasrin.tech@example.com",
    categories: ["Electrical"],
    areas: ["Naogaon"],
    hourlyRate: 400,
    experienceYears: 6,
    bio: "Certified electrician focused on residential wiring safety.",
  },
  {
    name: "Jahangir Alam",
    email: "jahangir.tech@example.com",
    categories: ["Electrical", "Appliance Repair"],
    areas: ["Bogura", "Natore"],
    hourlyRate: 380,
    experienceYears: 4,
    bio: "Handles both wiring jobs and common appliance repairs.",
  },
  {
    name: "Salma Begum",
    email: "salma.tech@example.com",
    categories: ["Cleaning"],
    areas: ["Rajshahi", "Natore"],
    hourlyRate: 250,
    experienceYears: 3,
    bio: "Detail-oriented home cleaner, specializes in move-out cleans.",
  },
  {
    name: "Mizanur Rahman",
    email: "mizanur.tech@example.com",
    categories: ["Cleaning", "Pest Control"],
    areas: ["Naogaon", "Chapainawabganj"],
    hourlyRate: 300,
    experienceYears: 7,
    bio: "Offers combined cleaning and pest treatment packages.",
  },
  {
    name: "Abul Kashem",
    email: "kashem.tech@example.com",
    categories: ["Painting"],
    areas: ["Pabna", "Natore"],
    hourlyRate: 320,
    experienceYears: 9,
    bio: "Interior and exterior painter, 9 years in the trade.",
  },
  {
    name: "Farida Yasmin",
    email: "farida.tech@example.com",
    categories: ["Carpentry"],
    areas: ["Rajshahi"],
    hourlyRate: 360,
    experienceYears: 5,
    bio: "Custom furniture repair and shelving installation.",
  },
  {
    name: "Delwar Hossain",
    email: "delwar.tech@example.com",
    categories: ["HVAC", "Appliance Repair"],
    areas: ["Bogura", "Rajshahi"],
    hourlyRate: 450,
    experienceYears: 10,
    bio: "AC and major appliance repair veteran, 10 years experience.",
  },
  {
    name: "Ruma Khatun",
    email: "ruma.tech@example.com",
    categories: ["Pest Control"],
    areas: ["Naogaon", "Rajshahi", "Natore"],
    hourlyRate: 280,
    experienceYears: 2,
    bio: "Newer to the trade, thorough and affordable pest treatments.",
  },
];

const CUSTOMER_SEED = [
  { name: "Tanvir Hasan", email: "tanvir.customer@example.com" },
  { name: "Sumaiya Islam", email: "sumaiya.customer@example.com" },
  { name: "Arifin Chowdhury", email: "arifin.customer@example.com" },
  { name: "Nusrat Jahan", email: "nusrat.customer@example.com" },
];

const ADMIN_SEED = { name: "Platform Admin", email: "admin@fixitnow.com" };

const PHONE_PREFIX = "0169"; // BD mobile-style prefix; suffixed with a counter to stay unique + 11 digits

function makePhone(counter: number) {
  return PHONE_PREFIX + String(1000000 + counter).slice(-7);
}

const REVIEW_SNIPPETS = [
  {
    content: "Arrived on time and fixed the issue quickly. Very professional.",
    stars: 5,
  },
  {
    content: "Good work overall, though a bit pricier than expected.",
    stars: 4,
  },
  { content: "Solid job, would book again.", stars: 4 },
  { content: "Took longer than quoted but the result was solid.", stars: 3 },
  { content: "Excellent communication and clean work.", stars: 5 },
  { content: "Decent service, minor follow-up was needed.", stars: 3 },
];

async function main() {
  console.log("Seeding started...");

  const hashedPassword = await bcrypt.hash(SEED_PASSWORD, SALT_ROUNDS);

  // ---- 1. Categories ----
  const categoryRecords = await Promise.all(
    CATEGORIES.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );
  const categoryIdByName = new Map(categoryRecords.map((c) => [c.name, c.id]));
  console.log(`Created ${categoryRecords.length} categories`);

  // ---- 2. Services ----
  let serviceCount = 0;
  const serviceIdsByCategory = new Map<string, string[]>();

  for (const category of CATEGORIES) {
    const services = SERVICES_BY_CATEGORY[category];
    const categoryId = categoryIdByName.get(category)!;
    const ids: string[] = [];

    for (const svc of services) {
      const created = await prisma.service.create({
        data: {
          name: svc.name,
          description: svc.description,
          categoryId,
        },
      });
      ids.push(created.id);
      serviceCount++;
    }

    serviceIdsByCategory.set(category, ids);
  }
  console.log(`Created ${serviceCount} services`);

  // ---- 3. Admin ----
  await prisma.user.upsert({
    where: { email: ADMIN_SEED.email },
    update: {},
    create: {
      name: ADMIN_SEED.name,
      email: ADMIN_SEED.email,
      phone: makePhone(0),
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Created admin user");

  // ---- 4. Customers ----
  const customers = [];
  for (let i = 0; i < CUSTOMER_SEED.length; i++) {
    const c = CUSTOMER_SEED[i]!;
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: {
        name: c.name,
        email: c.email,
        phone: makePhone(i + 1),
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });
    customers.push(user);
  }
  console.log(`Created ${customers.length} customers`);

  // 5. Technicians (User + TechnicianProfile + Availability)
  const technicianProfiles = [];

  for (let i = 0; i < TECHNICIAN_SEED.length; i++) {
    const t = TECHNICIAN_SEED[i]!;

    const user = await prisma.user.upsert({
      where: { email: t.email },
      update: {},
      create: {
        name: t.name,
        email: t.email,
        phone: makePhone(100 + i),
        password: hashedPassword,
        role: "TECHNICIAN",
      },
    });

    const profile = await prisma.technicianProfile.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        bio: t.bio,
        hourlyRate: t.hourlyRate,
        experienceYears: t.experienceYears,
        serviceAreas: t.areas,
      },
    });

    await prisma.availability.upsert({
      where: { technicianId: profile.id },
      update: {},
      create: {
        technicianId: profile.id,
        weekendDays: "FRI",
        startTime: "09:00",
        endTime: "17:00",
      },
    });

    technicianProfiles.push({ profile, categories: t.categories, user });
  }
  console.log(
    `Created ${technicianProfiles.length} technicians with availability`,
  );

  // 6. Completed bookings + reviews (so rating filters have real data)
  let reviewCount = 0;
  let reviewSnippetIndex = 0;

  for (const tech of technicianProfiles) {
    // give each technician 2-4 completed bookings + reviews, pulling services from their own categories
    const eligibleServiceIds = tech.categories.flatMap(
      (cat) => serviceIdsByCategory.get(cat) ?? [],
    );
    if (eligibleServiceIds.length === 0) continue;

    const numReviews = 2 + (reviewSnippetIndex % 3);

    for (let j = 0; j < numReviews; j++) {
      const customer = customers[(reviewSnippetIndex + j) % customers.length]!;
      const serviceId = eligibleServiceIds[j % eligibleServiceIds.length]!;
      const area = tech.profile.serviceAreas[0] ?? "Rajshahi";

      const address = await prisma.address.upsert({
        where: {
          userId_whereAbout: { userId: customer.id, whereAbout: "HOME" },
        },
        update: {},
        create: {
          userId: customer.id,
          address_line_1: "House 12, Road 4",
          city: area,
          region: "Rajshahi Division",
          postCode: "6500",
          whereAbout: "HOME",
        },
      });

      const booking = await prisma.booking.create({
        data: {
          userId: customer.id,
          serviceId,
          technicianId: tech.profile.id,
          addressId: address.id,
          status: "COMPLETED",
        },
      });

      const snippet =
        REVIEW_SNIPPETS[(reviewSnippetIndex + j) % REVIEW_SNIPPETS.length]!;

      await prisma.review.create({
        data: {
          userId: customer.id,
          technicianId: tech.profile.id,
          bookingId: booking.id,
          content: snippet.content,
          givenStars: snippet.stars,
        },
      });

      reviewCount++;
    }

    reviewSnippetIndex++;
  }
  console.log(`Created ${reviewCount} completed bookings with reviews`);

  console.log("Seeding finished.");
  console.log(`All seeded users share the password: ${SEED_PASSWORD}`);
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
