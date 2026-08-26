import { getActiveHero } from "@/services/hero.service";
import HeroClient from "./HeroClient";

export default async function HeroSection() {
  const hero = await getActiveHero();

  if (!hero) return null;

  return <HeroClient hero={hero} />;
}