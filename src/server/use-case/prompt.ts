import { insertPromptDataAccess, selectPromptDataAccess } from "../data-access/prompts"

export const insertPromptUseCase = async (prompt: string) => {
    return await insertPromptDataAccess(prompt)
}
export const selectPromptUseCase = async (promptId: string) => {
    return await selectPromptDataAccess(promptId)
}