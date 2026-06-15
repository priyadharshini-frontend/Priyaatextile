import Navbar from "@/components/common/navbar/Navbar";
import HeroSection from "@/components/home/HeroSection";
import { Features } from "@/components/home/Features";
import { Category } from "@/components/home/Category";
import { Collection } from "@/components/home/Collection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Craftman } from "@/components/home/Craftman";
import Testimonial from "@/components/home/Testimonial";
import InstaGallery from "@/components/home/InstaGallery";
// import NewsLetter from "@/components/home/NewsLetter";
import Footer from "@/components/common/footer/footer";
import { getCurrentUser } from "@/lib/curentUser";
import { Categories } from "@/components/home/Categories";
import { Bestseller } from "@/components/home/Bestseller";

export default async function Home() {
  const users = await getCurrentUser();





  return (
    <>
      <Navbar user={users} />
      <HeroSection />
        <Collection />
      <Categories/>
      <Features />
         <PromoBanner />
   
          
              <Bestseller/>

    
   
      <Craftman />
      <Testimonial />
      <InstaGallery />
    
      <Footer />
    </>
  );
}