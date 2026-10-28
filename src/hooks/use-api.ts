import { apiClient } from '@/lib/api-client'
import { handleApiError } from '@/lib/handle-api-errors';
import { CreateOrder, CreateOrderSchema, OrderSchema, OrdersSchema } from '@/schemas/orders.schema';
import { CreateProduct, CreateProductSchema, ProductSchema, ProductsSchema } from '@/schemas/product.schema'
import { CreateUser, CreateUserSchema, UserSchema, UsersSchema } from '@/schemas/user.schema';

export default function useApi() {

    const getProducts = async () => {
        try {
            const { data } = await apiClient('products', ProductsSchema)
            console.log(data);
        } catch (err) {
            handleApiError(err)
        }
    }

    const postProduct = async (formData: CreateProduct) => {
        try {
            const { data } = await apiClient('products', ProductSchema, CreateProductSchema, {
                method: 'POST',
                body: formData,
            })
            console.log(data)
        } catch (err) {
            handleApiError(err)
        }
    }

    const getUsers = async () => {
        try {
            const { data } = await apiClient('users', UsersSchema)
            console.log(data)
        } catch (err) {
            handleApiError(err)
        }
    }

    const postUser = async (formData: CreateUser) => {
        try {
            const { data } = await apiClient('users', UserSchema, CreateUserSchema, {
                method: 'POST',
                body: formData
            })
            console.log(data)
        } catch (err) {
            handleApiError(err)
        }
    }

    const getOrders = async () => {
        try {
            const { data } = await apiClient('orders', OrdersSchema)
            console.log(data)
        } catch (err) {
            handleApiError(err)
        }
    }

    const postOrder = async () => {
        try {
            const { data } = await apiClient('orders', OrderSchema, CreateOrderSchema, {
                method: 'POST',
                body: { userId: 1, status: 'pending', products: [{ price: 500, productId: 2, quantity: 5 }] }
            })
            console.log(data)
        } catch (err) {
            handleApiError(err)
        }
    }

    return { getProducts, postProduct, getUsers, postUser, getOrders, postOrder }

}
