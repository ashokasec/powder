import mongoose, { Schema, Document, Model, Types } from "mongoose";

interface IChat extends Document {
    id: string;
    title: string;
    messages: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const ChatSchema = new Schema<IChat>(
    {
        id: { type: String, unique: true, required: true },
        title: { type: String, required: true },
        messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    { timestamps: true }
);

export const Chat: Model<IChat> =
    mongoose.models.Chat || mongoose.model<IChat>("Chat", ChatSchema);
