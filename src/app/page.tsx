import Image from "next/image";
import Navbar from "@/components/common/navbar/Navbar";
import HeroSection from "@/components/home/HeroSection";
import { Features } from "@/components/home/Features";
import { Category } from "@/components/home/Category";
import { Collection } from "@/components/home/Collection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Craftman } from "@/components/home/Craftman";
import Testimonial from "@/components/home/Testimonial";
import InstaGallery from "@/components/home/InstaGallery";
import NewsLetter from "@/components/home/NewsLetter";
import Footer from "@/components/common/footer/footer";

export default function Home() {
  return (
   <>
 
       <Navbar/>

  

   <HeroSection/>
   <Features/>
   <Category/>
   <Collection/>
   <PromoBanner/>
   <Craftman/>
   <Testimonial/>
   <InstaGallery/>
   <NewsLetter/>
   
 

   <Footer/>

   
   </>
        
          
  );
}
