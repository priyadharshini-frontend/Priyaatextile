type Props = {
  product: any;
};

export default function ProductGallery({ product }: Props) {
  return (
    <div>
      <div className="rounded-2xl overflow-hidden border">
        <div className="w-full h-[500px]">
           <img
         src="/images/saree.jpeg"
            alt="{product.name}"
          className="w-full h-full object-contain"
        />

        </div>
       
      </div>
    </div>
  );
}