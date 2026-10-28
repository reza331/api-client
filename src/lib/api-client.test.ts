
import { describe, it, expect, vi, afterEach } from 'vitest'
import { apiClient } from './api-client'
import { ProductSchema, ProductsSchema } from '@/schemas/product.schema'
import { ApiError } from './api-error'
import { NetworkError } from './network-error'
import { ApiParseError } from './api-parse-error'
import { ApiValidationError } from './api-validation-error'
import { CreateProductSchema } from '@/schemas/product.schema'


afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
})

describe('apiClient', () => {

    it('returns validated data on success', async () => {
        const mockResponse = {
            data: [
                {
                    id: 1,
                    name: 'Laptop',
                    price: 3000,
                    stock: 5,
                    active: true,
                },
            ],
            message: 'products fetched successfully',
        }

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                Response.json(mockResponse, { status: 200 })
            )
        )

        const result = await apiClient('products', ProductsSchema)

        expect(result.data.data).toEqual(mockResponse.data)
        expect(result.data.message).toBe('products fetched successfully')
        expect(fetch).toHaveBeenCalledOnce()
    })

    it('throws ApiError when response is not ok', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                new Response(null, { status: 400 })
            )
        )

        await expect(
            apiClient('products', ProductsSchema)
        ).rejects.toBeInstanceOf(ApiError)
    })

    it('throws NetworkError when fetch fails', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockRejectedValue(new Error('Network failure'))
        )

        await expect(
            apiClient('products', ProductsSchema)
        ).rejects.toBeInstanceOf(NetworkError)
    })


    it('throws ApiParseError when response JSON is invalid', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                new Response('invalid json', {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                })
            )
        )

        await expect(
            apiClient('products', ProductsSchema)
        ).rejects.toBeInstanceOf(ApiParseError)
    })


    it('throws ApiValidationError when response data is invalid', async () => {
        const invalidResponse = {
            data: [
                {
                    id: 1,
                    name: 'Laptop',
                    price: '3000',
                    stock: 5,
                    active: true,
                },
            ],
            message: 'products fetched successfully',
        }

        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue(
                Response.json(invalidResponse, { status: 200 })
            )
        )

        await expect(
            apiClient('products', ProductsSchema)
        ).rejects.toBeInstanceOf(ApiValidationError)
    })

    it('throws ApiValidationError before fetch when request body is invalid', async () => {
        const invalidBody: unknown = JSON.parse(
            '{"name":"Laptop","price":"3000","stock":5,"active":true}'
        )

        const fetchMock = vi.fn()
        vi.stubGlobal('fetch', fetchMock)

        await expect(
            apiClient(
                'products',
                ProductsSchema,
                CreateProductSchema,
                {
                    method: 'POST',
                    body: invalidBody,
                }
            )
        ).rejects.toBeInstanceOf(ApiValidationError)

        expect(fetchMock).not.toHaveBeenCalled()
    })

    it('sends a valid request body as JSON', async () => {
        const validBody = {
            name: 'Laptop',
            price: 3000,
            stock: 5,
            active: true,
        }

        const fetchMock = vi.fn().mockResolvedValue(
            Response.json(
                {
                    data: {
                        id: 1,
                        ...validBody,
                    },
                    message: 'Product created successfully',
                },
                { status: 201 }
            )
        )

        vi.stubGlobal('fetch', fetchMock)

        await apiClient(
            'products',
            ProductSchema,
            CreateProductSchema,
            {
                method: 'POST',
                body: validBody,
            }
        )

        expect(fetchMock).toHaveBeenCalledOnce()

        const [, requestOptions] = fetchMock.mock.calls[0]

        expect(requestOptions.body).toBe(JSON.stringify(validBody))
        expect(new Headers(requestOptions.headers).get('Content-Type'))
            .toBe('application/json')
    })


})
