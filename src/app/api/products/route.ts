import { products } from "@/data/data";
import { ApiResponse } from "@/types/api.type";
import { CreateProductSchema, Product } from "@/schemas/product.schema";
import { NextRequest } from "next/server";

export async function GET() {

    const res: ApiResponse<Product[]> = {
        data: products,
        message: 'products fetched successfully'
    }

    return Response.json(res, { status: 200 })

}

export async function POST(req: NextRequest) {

    const body: unknown = await req.json()

    const parseResult = CreateProductSchema.safeParse(body)

    if (parseResult.success) {

        const res: ApiResponse<Product> = {
            data: { id: products.length + 1, active: true, ...parseResult.data },
            message: 'product Posted successfully'
        }

        return Response.json(res, { status: 201 })

    }

    const res = {

        data: null,
        message: JSON.stringify(parseResult.error.issues)

    }

    return Response.json(res, { status: 400 })

}