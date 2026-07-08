import Link from "next/link";

export default function Terms() {
  return (
    <main>
   <section className="relative overflow-hidden bg-gradient-to-r from-[#3d1f1f] via-[#5B2C2C] to-[#8B1E1E] py-28">

  <div className="absolute inset-0 opacity-10">
    <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white blur-3xl"/>
    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white blur-3xl"/>
  </div>

  <div className="relative max-w-7xl mx-auto px-6 text-center">

    <span className="inline-flex bg-white/10 backdrop-blur px-5 py-2 rounded-full text-white">
      📄 Legal Information
    </span>

    <h1 className="text-6xl font-bold text-white mt-8">
      Terms & Conditions
    </h1>

    <p className="mt-8 text-lg text-gray-200 max-w-3xl mx-auto leading-8">
      Please read these Terms & Conditions carefully before using
      the Priyaa Textile website or placing an order.
    </p>

  </div>

</section>
<section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">

<div className="grid md:grid-cols-3 gap-6">

<div className="bg-white rounded-3xl shadow-xl p-8 text-center">

<h3 className="font-bold text-xl">

Secure Shopping

</h3>

<p className="text-gray-600 mt-3">

Protected payment process

</p>

</div>

<div className="bg-white rounded-3xl shadow-xl p-8 text-center">

<h3 className="font-bold text-xl">

Fair Policies

</h3>

<p className="text-gray-600 mt-3">

Transparent customer policies

</p>

</div>

<div className="bg-white rounded-3xl shadow-xl p-8 text-center">

<h3 className="font-bold text-xl">

Customer Support

</h3>

<p className="text-gray-600 mt-3">

Always ready to help

</p>

</div>

</div>

</section>
<section className="max-w-6xl mx-auto px-6 py-24 space-y-10">

{[
{
title:"1. Acceptance of Terms",
description:"By accessing or using Priyaa Textile, you agree to comply with these Terms & Conditions."
},
{
title:"2. Product Information",
description:"We strive to provide accurate descriptions, images and pricing. Minor variations may occur."
},
{
title:"3. Pricing",
description:"All prices displayed are subject to change without prior notice."
},
{
title:"4. Orders",
description:"Orders will be confirmed only after successful payment verification."
},
{
title:"5. Payments",
description:"Payments are securely processed through trusted payment gateways."
},
{
title:"6. Shipping",
description:"Delivery timelines may vary depending on the destination and courier partner."
},
{
title:"7. Returns & Refunds",
description:"Returns and refunds are governed by our Return & Refund Policy."
},
{
title:"8. Intellectual Property",
description:"All website content belongs to Priyaa Textile and may not be copied without permission."
},
{
title:"9. Limitation of Liability",
description:"Priyaa Textile is not responsible for delays or damages beyond our reasonable control."
},
{
title:"10. Contact",
description:"For questions regarding these Terms & Conditions, please contact our support team."
},
].map((item)=>(
<div
key={item.title}
className="bg-white rounded-[30px] shadow-lg hover:shadow-2xl transition p-10"
>

<h2 className="text-3xl font-bold text-[#3d1f1f]">

{item.title}

</h2>

<p className="mt-6 text-gray-600 leading-8">

{item.description}

</p>

</div>
))}

</section>
<section className="max-w-6xl mx-auto px-6">

<div className="rounded-[30px] bg-gradient-to-r from-[#8B1E1E] to-[#3d1f1f] p-10 text-white">

<h2 className="text-4xl font-bold">

Important Notice

</h2>

<p className="mt-6 leading-8 text-white/80">

Priyaa Textile reserves the right to modify these Terms &
Conditions at any time. Updates will be published on this page.

</p>

</div>

</section>
<section className="py-24">

<div className="max-w-4xl mx-auto text-center px-6">

<h2 className="text-5xl font-bold text-[#3d1f1f]">

Need More Information?

</h2>

<p className="mt-8 text-lg text-gray-600 leading-8">

Our support team is happy to answer any questions regarding
our Terms & Conditions.

</p>

<div className="flex flex-wrap justify-center gap-5 mt-10">

<Link
href="/contact"
className="bg-[#8B1E1E] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6b1717]"
>

Contact Us

</Link>

<Link
href="/privacy-policy"
className="border-2 border-[#8B1E1E] text-[#8B1E1E] px-8 py-4 rounded-xl font-semibold hover:bg-[#8B1E1E] hover:text-white"
>

Privacy Policy

</Link>

</div>

</div>

</section>
</main>

  );
}