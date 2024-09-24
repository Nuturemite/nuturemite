'use server'
import { revalidatePath } from "next/cache"

export async function revalidate(){
    revalidatePath('/')
}

const fetchData = async (url) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url)
    return res.json()
}

export const getAnalytics = async () => {
    const res = await fetchData(`/analytics`)
    return res.json()
}

export const getBlogs = async () => {
    const res = await fetchData(`/blogs`)
    return res.json()
}

export const getBlog = async (slug) => {
    const res = await fetchData(`/blogs/${slug}`)
    return res.json()
}