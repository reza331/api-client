import { z } from 'zod'

export const createApiResponseSchema = <T extends z.ZodType>(dataSchema: T) => {
    return z.object({
        data: dataSchema,
        message: z.string(),
    })
}