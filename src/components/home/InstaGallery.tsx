"use client"
import { useState,useEffect } from 'react';
interface Reel {
  id: string;
  thumbnail: string;
  caption: string;
  instagramUrl: string;
}

export default function InstaGallery() {
   const [reels, setReels] = useState<Reel[]>([]);

  useEffect(() => {
    fetchReels();
  }, []);
   async function fetchReels() {
    try {
      const res = await fetch("/api/reels");

      const data = await res.json();

      if (data.success) {
        setReels(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

 
function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="white"
      className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg"
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}

function InstagramBadge() {
  return (
    <div className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-sm">
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          stroke="#833AB4"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4.5" stroke="#C13584" strokeWidth="2" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="#E1306C" />
      </svg>
    </div>
  );
}
  return (
     <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="space-y-4 flex-1">
        <div className="flex flex-col items-center">
          <div className="w-30 ">
            <img src="/design.webp" alt="" className="w-full" />
          </div>

          <h2
            className="text-4xl font-bold text-center"
            style={{ color: "#3d1f1f" }}
          >
              Follow Our Journey
          </h2>
          <div className="w-30 ">
            <img src="/design.webp" alt="" className="w-full" />
          </div>
        </div>
      </div>
       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href={reel.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-[9/16] rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src={reel.thumbnail}
                alt={reel.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* dark gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" />

              <InstagramBadge />

              {/* play icon centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayIcon />
              </div>

              {/* caption */}
              <p className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium line-clamp-2">
                {reel.caption}
              </p>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/yourshopname"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 rounded-full border border-[#C13584] text-[#C13584] text-sm font-medium hover:bg-[#C13584] hover:text-white transition-colors"
          >
            Follow us on Instagram
          </a>
        </div>

       

    
      </div>
    </section>
  
  )
}
