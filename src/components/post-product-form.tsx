import useApi from '@/hooks/use-api'
import { CreateProduct } from '@/schemas/product.schema'
import { useForm } from 'react-hook-form'

export default function PostProductForm() {

    const { postProduct } = useApi()
    const { register, handleSubmit } = useForm<CreateProduct>()

    const subHandler = (data: CreateProduct) => {
        postProduct({ name: data.name, price: Number(data.price), stock: Number(data.stock) })
    }

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(subHandler)}>
            <input {...register('name')} type="text" placeholder='name ...' />
            <input {...register('price')} min={0} type="number" placeholder='price ...' />
            <input {...register('stock')} min={0} step={1} type="number" placeholder='stock ...' />
            <button>Post Product</button>
        </form>
    )
}
