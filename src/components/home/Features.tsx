import React from 'react'

export const Features = () => {
     const features = [
    {
      title: 'Pure Handloom',
      subtitle: 'Authentic & Handcrafted',
      icon: '✨',
    },
    {
      title: 'Premium Quality',
      subtitle: 'Finest Fabrics',
      icon: '🧵',
    },
    {
      title: 'Secure Payment',
      subtitle: '100% Safe & Secure',
      icon: '🔒',
    },
    {
      title: 'Worldwide Shipping',
      subtitle: 'Fast Delivery',
      icon: '🚚',
    },
  ];
  return (
     <section className="border-y bg-[#f8f5f0] py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:px-8">
        {features.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-xl border border-[#e7dbc7] bg-white p-4 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8b1e1e] text-xl text-white">
              {item.icon}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#3d1f1f]">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
