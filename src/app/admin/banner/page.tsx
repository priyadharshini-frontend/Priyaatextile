"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BannerModal from "@/components/Admin/BannerModal";

interface Hero {
  id: string;
  title: string;
  subtitle?: string;
  desktopImage: string;
  isActive: boolean;
  buttonLink:string;

}

export default function HeroPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [open, setOpen] = useState(false);

  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [loading,setLoading]=useState(true)

  async function fetchHeroes() {
    try{
      setLoading(true)
       const res = await fetch("/api/admin/banner");
    const data = await res.json();

    if (data.success) {
      setHeroes(data.data);
    }

    }
    catch(error){
          console.error("Failed to fetch banner:", error);

    }
    finally{
      setLoading(false)
    }
   
  }
  async function deleteHeroById(id: string) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this hero?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(`/api/admin/banner/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      fetchHeroes();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
}

  useEffect(() => {
    fetchHeroes();
  }, []);

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Hero Management</h1>
          <p className="text-gray-500 mt-1">
            Manage homepage hero banners
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-[#7A1F3D] hover:bg-[#611731] text-white px-5 py-3 rounded-xl"
        >
          + Add Hero
        </button>
      </div>
      {loading?(
       
          <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500">Banner loading...</p>
      </div>

      

      ):heroes.length==0 ?( 
 <p className="text-gray-500">Banner Not found</p>
      )

       : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

          {heroes.map((hero) => (
            <div
              key={hero.id}
              className="bg-white rounded-xl shadow border overflow-hidden"
            >

              <div className="relative">
                <img src={hero.desktopImage} alt={hero.title}  className="h-40 w-full object-contain"/>
                
              </div>

              <div className="p-4">

                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    {hero.title}
                  </h2>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      hero.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {hero.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <p className=" mt-2 text-l font-semibold">
                    Subtitle :
                    <span className="text-gray-500 ms-3">{hero.subtitle}</span>
                  
                </p>
                 <p className=" mt-2 text-l font-semibold">
                    Link :
                    <span className="text-gray-500 ms-3">{hero.buttonLink}</span>
                  
                </p>

                <div className="flex gap-3 mt-5">

                 

                  <button
                    className="flex-1 bg-red-500 text-white rounded-lg py-2 hover:bg-red-600"
                     onClick={() => deleteHeroById(hero.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

      <BannerModal
        open={open}
        onClose={() => {
          setOpen(false);
          fetchHeroes();
        }}
      />

    </div>
  );
}