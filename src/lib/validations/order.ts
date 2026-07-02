import z from "zod";

export const checkoutSchema=z.object({
    shippingName:z.string

})