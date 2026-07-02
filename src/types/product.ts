export interface Product{
    isBestSeller:boolean;
    id:string;
    name:string;
    slug:string;
    description:string;
    price:number;
    salesPrice?:number;
    stock:number;
    image:string;
    brand:string;
    isFeatured:boolean;
    isActive:boolean;
    
}