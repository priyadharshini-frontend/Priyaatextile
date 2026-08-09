import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/home/HeroSection";
import { Category } from "@/components/home/Category";
import { Collection } from "@/components/home/Collection";

import Testimonial from "@/components/home/Testimonial";
import InstaGallery from "@/components/home/InstaGallery";
// import NewsLetter from "@/components/home/NewsLetter";
import Footer from "@/components/common/footer/footer";
import { getCurrentUser } from "@/lib/curentUser";
import { NewArrival } from "@/components/home/NewArrival";


import { Bestseller } from "@/components/home/Bestseller";

export default async function Home() {
  const users = await getCurrentUser();

  return (
    <>
      <Navbar user={users} />
      <HeroSection />
        <Collection />
          
              <Bestseller/>
              {/* <Category/> */}
              <NewArrival/>

    
   
   
      <Testimonial />
      <InstaGallery />
    
      <Footer />
    </>
  );
}