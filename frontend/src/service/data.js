'use server'
import { revalidatePath } from "next/cache"

export async function revalidate(){
    revalidatePath('/')
}

const fetchData = async (url) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url)
    return res.json()
}

export const getProducts = async () => {
    const res = await fetchData(`/api/products`)
    return res.json()
}

export const getProduct = async (slug) => {
    const res = await fetchData(`/api/products/${slug}`)
    return res.json()
}