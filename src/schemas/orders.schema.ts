import { z } from 'zod'

export const OrderItemSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive(),
    price: z.number().nonnegative(),
})

export const OrderStatusSchema = z.enum([
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
])

export const OrderSchema = z.object({
    id: z.number().int().positive(),
    userId: z.number().int().positive(),
    products: z.array(OrderItemSchema),
    totalPrice: z.number().nonnegative(),
    status: OrderStatusSchema,
})

export const CreateOrderSchema = z.object({
    userId: z.number().int().positive(),
    products: z.array(OrderItemSchema).min(1),
    status: OrderStatusSchema.optional(),
})

export const OrdersSchema = z.array(OrderSchema)

export type OrderItem = z.infer<typeof OrderItemSchema>
export type OrderStatus = z.infer<typeof OrderStatusSchema>
export type Order = z.infer<typeof OrderSchema>
export type CreateOrder = z.infer<typeof CreateOrderSchema>
