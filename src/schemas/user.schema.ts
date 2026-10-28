import { z } from "zod";

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number(),
    email: z.string().email(),
})

export const CreateUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    age: z.number().int().nonnegative(),
})


export const UsersSchema = z.array(UserSchema)

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>