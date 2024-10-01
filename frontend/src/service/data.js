'use server'
import axios from "axios"
import { revalidatePath } from "next/cache"

export async function revalidate(){
    revalidatePath('/')
}

const fetchData = async (url) => {
    const {data} = await axios.get(process.env.NEXT_PUBLIC_API_URL + url)
    return data
}

export const getAnalytics = async () => {
    return await fetchData(`/analytics`)
}

export const getBlogs = async () => {
    return await fetchData(`/blogs`)
}

export const getBlog = async (slug) => {
    return await fetchData(`/blogs/${slug}`)
}

export const getBanners = async () => {
    const data = await fetchData(`/banners`)
    return {...data,banners:data.data}
}

export const getCategories = async () => {
    return await fetchData(`/categories`)
}

export const getProduct = async (slug) => {
    return await fetchData(`/products/${slug}`)
}