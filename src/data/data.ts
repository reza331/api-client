import { Order } from "@/schemas/orders.schema"
import { Product } from "@/schemas/product.schema"
import { User } from "@/schemas/user.schema"

export const products: Product[] = [
    { id: 1, name: 'Watch', price: 500, stock: 2, active: true },
    { id: 2, name: 'Clock', price: 100, stock: 5, active: true },
    { id: 3, name: 'Laptop', price: 3000, stock: 11, active: true },
    { id: 4, name: 'Bracelet', price: 700, stock: 7, active: true },
    { id: 5, name: 'Phone', price: 1500, stock: 10, active: true },
    { id: 6, name: 'T-Shirt', price: 100, stock: 5, active: true },
    { id: 7, name: 'Suit', price: 700, stock: 15, active: true },
    { id: 8, name: 'Cool-Pad', price: 120, stock: 18, active: true },
]

export const users: User[] = [
    { id: 1, name: 'reza', age: 20, email: 'reza@test.com' },
    { id: 2, name: 'sara', age: 25, email: 'sara@test.com' },
    { id: 3, name: 'sam', age: 20, email: 'sam@test.com' },
]

export const orders: Order[] = [
    {
        id: 1,
        userId: 1,
        products: [
            { productId: 1, quantity: 1, price: 500 },
            { productId: 2, quantity: 2, price: 100 },
        ],
        totalPrice: 700,
        status: 'delivered',
    },
    {
        id: 2,
        userId: 2,
        products: [
            { productId: 3, quantity: 1, price: 3000 },
        ],
        totalPrice: 3000,
        status: 'processing',
    },
    {
        id: 3,
        userId: 3,
        products: [
            { productId: 5, quantity: 1, price: 1500 },
            { productId: 6, quantity: 3, price: 100 },
        ],
        totalPrice: 1800,
        status: 'shipped',
    },
    {
        id: 4,
        userId: 1,
        products: [
            { productId: 4, quantity: 2, price: 700 },
            { productId: 8, quantity: 1, price: 120 },
        ],
        totalPrice: 1520,
        status: 'pending',
    },
    {
        id: 5,
        userId: 2,
        products: [
            { productId: 7, quantity: 1, price: 700 },
            { productId: 5, quantity: 2, price: 1500 },
        ],
        totalPrice: 3700,
        status: 'cancelled',
    },
]