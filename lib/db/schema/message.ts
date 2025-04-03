import { Message as AIMessage } from "ai";
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
    _id: mongoose.Types.ObjectId;
    id: string;
    message: AIMessage;
    chatId: string;
    createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        id: { type: String, required: true },
        message: { type: Schema.Types.Mixed },
        chatId: { type: String, ref: "Chat", required: true },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
        strict: "throw"
    }
);

export const Message: Model<IMessage> =
    mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
