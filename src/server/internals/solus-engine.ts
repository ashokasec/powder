import { env } from "@/lib/env"
import axios from "axios"

const solusInstance = axios.create({
    baseURL: env.SOLUS_ENGINE_SERVER,
    timeout: 10000,
    headers: { 'Authorization': `Bearer ${env.SOLUS_API_KEY}` }
})

export async function renderExistingTemplate(endcodedJsxTemplate: string) {
    const response = await solusInstance.post("/render", { data: endcodedJsxTemplate })
    return response.data
}