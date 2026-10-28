import { z } from "zod"

export class ApiValidationError extends Error {

    constructor(error: z.ZodError, message: string) {
        super(message)
        this.name = 'ValidationError'
        this.zodError = error
    }

    zodError: z.ZodError

}