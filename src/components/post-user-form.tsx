import useApi from '@/hooks/use-api'
import { CreateUser } from '@/schemas/user.schema'
import { useForm } from 'react-hook-form'

export default function PostUserForm() {

    const { postUser } = useApi()
    const { register, handleSubmit } = useForm<CreateUser>()

    const subHandler = (data: CreateUser) => {
        postUser({ name: data.name, email: data.email, age: Number(data.age) })
    }

    return (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(subHandler)}>
            <input {...register('name')} type="text" placeholder='name ...' />
            <input {...register('email')} type="email" placeholder='email ...' />
            <input {...register('age')} min={10} step={1} type="number" placeholder='age ...' />
            <button>Post User</button>
        </form>
    )
}
