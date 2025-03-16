import mongoose, { Schema, Types } from "mongoose";

interface ChatModelType extends Document {
    chatId: string;
    title: string;
    messages: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

interface ChatType extends Document {
    role: "user" | "assistant";
    content: string;
    chatId: string;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<ChatType>(
    {
        role: { type: String, required: true },
        content: { type: String },
        chatId: { type: String, ref: "Chat", required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false }, discriminatorKey: "role" }
);

const ChatSchema = new Schema(
    {
        chatId: { type: String, unique: true, required: true },
        title: { type: String, required: true },
        messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    { timestamps: true }
);

export const MessageModel = mongoose.models.Message as mongoose.Model<ChatType> || mongoose.model<ChatType>("Message", MessageSchema);
export const ChatModel = mongoose.models.Chat as mongoose.Model<ChatModelType> || mongoose.model<ChatModelType>("Chat", ChatSchema);