
import { ApiResponse } from '@/types/api.type'
import { CreateOrderSchema, Order } from '@/schemas/orders.schema'
import { NextRequest } from 'next/server'
import { orders, products, users } from '@/data/data'

export async function GET() {
    
    const res: ApiResponse<Order[]> = {
        data: orders,
        message: 'orders fetched successfully',
    }

    return Response.json(res, { status: 200 })
}

export async function POST(req: NextRequest) {
    
    let body: unknown

    try {
        body = await req.json()
    } catch {
        return Response.json(
            { data: null, message: 'Invalid JSON body' },
            { status: 400 },
        )
    }

    const parseResult = CreateOrderSchema.safeParse(body)

    if (!parseResult.success) {
        return Response.json(
            {
                data: null,
                message: JSON.stringify(parseResult.error.issues),
            },
            { status: 400 },
        )
    }

    const { userId, products: items, status } = parseResult.data

    if (!users.some((user) => user.id === userId)) {
        return Response.json(
            { data: null, message: 'User not found' },
            { status: 400 },
        )
    }

    for (const item of items) {
        const product = products.find((p) => p.id === item.productId)

        if (!product) {
            return Response.json(
                { data: null, message: `Product ${item.productId} not found` },
                { status: 400 },
            )
        }

        if (item.quantity > product.stock) {
            return Response.json(
                { data: null, message: `Insufficient stock for ${product.name}` },
                { status: 400 },
            )
        }
    }

    const totalPrice = items.reduce(
        (total, item) => total + item.quantity * item.price,
        0,
    )

    const newOrder: Order = {
        id: orders.length + 1,
        userId,
        products: items,
        totalPrice,
        status: status ?? 'pending',
    }

    const res: ApiResponse<Order> = {
        data: newOrder,
        message: 'order created successfully',
    }

    return Response.json(res, { status: 201 })
}
