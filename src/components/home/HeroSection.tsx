
import { getActiveHero } from "@/services/hero.service";
export default async function HeroSection() {
    const hero = await getActiveHero();

  if (!hero) return null;


  return (
    <section className="relative mt-20 " >

      {/* Desktop */}

     <div className="hidden md:block w-full" style={{ height: "80vh" }}>
  <img
    src={hero.desktopImage}
    alt={hero.title}
    className="w-full h-full object-contain"
  />
</div>

      {/* Mobile */}

      <div className="block lg:hidden relative" style={{ height: "100vh" }}>
         <img
    src={hero.mobileImage||"/images/Banner/ban1.jpeg"}
    alt={hero.title}
    className="w-full h-full sm:object-cover"
  />

        {/* <Image
          src={hero.mobileImage || hero.desktopImage}
          alt={hero.title}
          fill
          priority
          className="object-cover"
        /> */}

      </div>

      {/* Overlay */}

   

    </section>
  );
}