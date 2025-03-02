import connect_db from "@/lib/connect-db"
import { PromptModel } from "../models/prompt"

export const insertPromptDataAccess = async (userPrompt: string) => {
    await connect_db()
    const prompt = new PromptModel({
        prompt: userPrompt
    })
    const response = await prompt.save()
    return response.promptId
}

export const selectPromptDataAccess = async (promptId: string) => {
    await connect_db()
    const prompt = await PromptModel.findOne({ promptId })
    return prompt
}