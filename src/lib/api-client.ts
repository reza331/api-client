
import { z } from 'zod'
import { ApiError } from './api-error'
import { createApiResponseSchema } from '@/schemas/api.schema'
import { ApiValidationError } from './api-validation-error'
import { NetworkError } from './network-error'
import { ApiParseError } from './api-parse-error'

interface RequestOptions<TBody = unknown> extends Omit<RequestInit, 'body'> {
    body?: TBody
}

const baseUrl = 'http://localhost:3000/api'

export const apiClient = async <TResponse, TRequest = unknown>(
    endPoint: string,
    responseSchema: z.ZodType<TResponse>,
    requestSchema?: z.ZodType<TRequest>,
    options?: RequestOptions<TRequest>
) => {

    let validBody: string | undefined

    if (options?.body !== undefined) {
        if (requestSchema) {

            const result = requestSchema.safeParse(options.body)

            if (!result.success) {
                throw new ApiValidationError(result.error, result.error.message)
            }

            validBody = JSON.stringify(result.data)

        } else {

            validBody = JSON.stringify(options.body)

        }
    }

    const headers = new Headers(options?.headers)

    if (validBody !== undefined && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json')
    }

    let response: Response

    try {
        response = await fetch(`${baseUrl}/${endPoint}`, {
            ...options,
            body: validBody,
            headers
        })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Network error'
        throw new NetworkError(message)
    }

    if (!response.ok) {
        throw new ApiError(response.status, `Error with ${response.status} status`)
    }

    let data: unknown

    try {
        data = await response.json()
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Parse error'
        throw new ApiParseError(message)
    }

    const apiSchema = createApiResponseSchema(responseSchema)
    const parseResult = apiSchema.safeParse(data)

    if (parseResult.success) {
        return { data: parseResult.data, response }
    }

    throw new ApiValidationError(parseResult.error, `Invalid API response: ${parseResult.error.message}`)
}
