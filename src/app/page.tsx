'use client'

import PostProductForm from "@/components/post-product-form";
import PostUserForm from "@/components/post-user-form";
import useApi from "@/hooks/use-api";

export default function Home() {

  const { getOrders, getProducts, getUsers, postOrder } = useApi()

  return (
    <div className="flex items-center justify-center text-white">
      <div className="w-full p-16 flex flex-col gap-10">
        <div>Check Console for the results</div>
        <button onClick={getProducts}>Get Products</button>
        <PostProductForm />
        <div className="h-0.5 w-full bg-white/25" />
        <button onClick={getUsers}>Get Users</button>
        <PostUserForm />
        <div className="h-0.5 w-full bg-white/25" />
        <button onClick={getOrders}>GET Orders</button>
        <button onClick={postOrder}>POST Orders</button>
      </div>
    </div>
  );
}
