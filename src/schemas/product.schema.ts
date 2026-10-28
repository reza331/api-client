import { z } from "zod";

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    stock: z.number(),
    active: z.boolean(),
})

export const CreateProductSchema = z.object({
    name: z.string(),
    price: z.number().nonnegative(),
    stock: z.number().int().nonnegative(),
    active: z.boolean().optional(),
})


export const ProductsSchema = z.array(ProductSchema)

export type Product = z.infer<typeof ProductSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>