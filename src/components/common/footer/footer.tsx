import Link from 'next/link';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

const footerLinks = {
  More: [
    { name: 'About us', href: '/products' },
    { name: 'store Location', href: '/products' },
    { name: 'contact', href: '/products' },
    { name: 'How to order', href: '/products' },
  ],

  Links: [
    { name: 'Privacy Policy', href: '/about' },
    { name: 'Returns', href: '/story' },
    { name: 'Shipping Policy', href: '/craftsmanship' },
    { name: 'Pricing', href: '/contact' },
     { name: 'Terms and Conditions', href: '/contact' },
  ],
};
export default function Footer() {
 

 

  return (
   <footer className="bg-[#2b0d0d] text-white">
      
      {/* Top Footer */}
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-4 lg:px-8">
        
        {/* Brand */}
        <div>
          {/* <h2 className="text-3xl font-bold text-[#d4af37]">
           
          </h2>

          <p className="mt-6 leading-8 text-gray-300">
            Discover timeless handcrafted sarees woven with
            elegance, culture, and tradition.
          </p> */}

          {/* Contact */}
          <div className="mt-8 space-y-4">
            
            <div className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-[#d4af37]" />

              <p className="text-sm text-gray-300">
                Chennai, Tamil Nadu, India
              </p>
            </div>

            <div className="flex items-center gap-3">
              <PhoneIcon className="h-5 w-5 text-[#d4af37]" />

              <a
                href="tel:+919999999999"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                +91 99999 99999
              </a>
            </div>

            <div className="flex items-center gap-3">
              <EnvelopeIcon className="h-5 w-5 text-[#d4af37]" />

              <a
                href="mailto:support@heritage.com"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                support@heritage.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            
            <h3 className="mb-6 text-lg font-semibold text-[#d4af37]">
              {category}
            </h3>

            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10">
        
        {/* Bottom Footer */}
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 text-sm text-gray-400 lg:flex-row lg:px-8">
          
          <p>
            © 2026 Heritage Sarees. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            
            <a
              href="#"
              className="transition hover:text-[#d4af37]"
            >
              Instagram
            </a>

            <a
              href="#"
              className="transition hover:text-[#d4af37]"
            >
              Facebook
            </a>

            <a
              href="#"
              className="transition hover:text-[#d4af37]"
            >
              Pinterest
            </a>

            <a
              href="#"
              className="transition hover:text-[#d4af37]"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}