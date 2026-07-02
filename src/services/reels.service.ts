import db from "@/lib/db";

interface ReelData {
  title?: string;
  caption: string;
  instagramUrl: string;
  thumbnail: string;
  isActive?: boolean;
}

// Get all reels (Admin)
export async function getReels() {
  return db.reel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

// Get only active reels (Website)
export async function getActiveReels() {
  return db.reel.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",

    },
  });
}

// Get single reel
export async function getReelById(id: string) {
  return db.reel.findUnique({
    where: {
      id,
    },
  });
}

// Create reel
export async function createReel(data: ReelData) {
  return db.reel.create({
    data: {
      title: data.title,
      caption: data.caption,
      instagramUrl: data.instagramUrl,
      thumbnail: data.thumbnail,
      isActive: data.isActive ?? true,
    },
  });
}

// Update reel
export async function updateReel(
  id: string,
  data: Partial<ReelData>
) {
  return db.reel.update({
    where: {
      id,
    },
    data,
  });
}

// Delete reel
export async function deleteReel(id: string) {
  return db.reel.delete({
    where: {
      id,
    },
  });
}