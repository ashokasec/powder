import { PowderMessageType, UserMessageType } from "@/lib/types/chat";
import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

interface ChatModelType extends Document {
    chatId: string;
    title: string;
    messages: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema = new Schema<UserMessageType | PowderMessageType>(
    {
        from: { type: String, enum: ["user", "powder"], required: true },
        text: { type: String },
        code: { type: String, default: null },
        codeLink: { type: String, default: null },
        isGenerated: { type: Boolean, default: false },
        hasCode: { type: Boolean, default: false },
        preface: { type: String, default: "" },
        emailTemplateName: { type: String, default: "" },
        codeBreakdown: { type: [String], default: [] },
        summary: { type: String, default: "" },
        chatId: { type: String, ref: "Chat", required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false }, discriminatorKey: "from" }
);

const ChatSchema = new Schema(
    {
        chatId: { type: String, unique: true, required: true },
        title: { type: String, required: true },
        messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    },
    { timestamps: true }
);

export const MessageModel = mongoose.models.Message as mongoose.Model<UserMessageType | PowderMessageType> || mongoose.model<UserMessageType | PowderMessageType>("Message", MessageSchema);
export const ChatModel = mongoose.models.Chat as mongoose.Model<ChatModelType> || mongoose.model<ChatModelType>("Chat", ChatSchema);
export type MessageType = InferSchemaType<typeof MessageSchema>