import db from "@/lib/db";

export interface HeroInput {
  title: string;
  subtitle?: string;
  description?: string;
  desktopImage: string;
  mobileImage?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive?: boolean;
}

// Get all heroes
export async function getHeroes() {
  return db.hero.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get active hero
export async function getActiveHero() {
  return db.hero.findFirst({
    where: {
      isActive: true,
    },
  });
}

// Get hero by ID
export async function getHeroById(id: string) {
  return db.hero.findUnique({
    where: {
      id,
    },
  });
}

// Create hero
export async function createHero(data: HeroInput) {
  // Allow only one active hero
  if (data.isActive) {
    await db.hero.updateMany({
      data: {
        isActive: false,
      },
    });
  }

  return db.hero.create({
    data,
  });
}

// Update hero
export async function updateHero(id: string, data: HeroInput) {
  if (data.isActive) {
    await db.hero.updateMany({
      data: {
        isActive: false,
      },
    });
  }

  return db.hero.update({
    where: {
      id,
    },
    data,
  });
}

// Delete hero
export async function deleteHero(id: string) {
  return db.hero.delete({
    where: {
      id,
    },
  });
}