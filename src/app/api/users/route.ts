import { users } from "@/data/data";
import { ApiResponse } from "@/types/api.type";
import { CreateUserSchema, User } from "@/schemas/user.schema";
import { NextRequest } from "next/server";

export async function GET() {

    const res: ApiResponse<User[]> = {
        data: users,
        message: 'users fetched successfully'
    }

    return Response.json(res, { status: 200 })

}

export async function POST(req: NextRequest) {

    const body: unknown = await req.json()

    const parseResult = CreateUserSchema.safeParse(body)

    if (parseResult.success) {

        const res: ApiResponse<User> = {
            data: { id: users.length + 1, ...parseResult.data },
            message: 'User Posted successfully'
        }

        return Response.json(res, { status: 201 })

    }


    const res = {

        data: null,
        message: JSON.stringify(parseResult.error.issues)

    }

    return Response.json(res, { status: 400 })

}