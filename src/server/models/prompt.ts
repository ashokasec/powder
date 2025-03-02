import mongoose, { InferSchemaType } from "mongoose";
import { nanoid } from "nanoid";

const promptSchema = new mongoose.Schema(
    {
        promptId: { type: String, required: true, default: () => nanoid(12) },
        prompt: { type: String, required: true },
    },
    { timestamps: true }
);

type PromptType = InferSchemaType<typeof promptSchema>;
export const PromptModel = mongoose.models.Prompt as mongoose.Model<PromptType> || mongoose.model<PromptType>("Prompt", promptSchema);

export type SelectPromptType = {
    promptId: PromptType["promptId"];
    prompt: PromptType["prompt"];
    createdAt: PromptType["createdAt"]
}
