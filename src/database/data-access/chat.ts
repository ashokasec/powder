import { nanoid } from "nanoid";
import { ChatModel, MessageModel } from "@/database/schema/chat"
import connectDB from "@/lib/misc/connect-db";
import { PowderMessageType, UserMessageType } from "@/lib/types/chat";

export const createNewChat = async ({
    title,
    prompt,
}: {
    title: string;
    prompt: string;
}) => {
    await connectDB()
    const chatId = nanoid(12);

    try {

        const chat = new ChatModel({
            chatId,
            title,
            messages: [],
        });

        const savedChat = await chat.save();

        console.log("saved chat", savedChat)

        const message = new MessageModel({
            from: "user",
            text: prompt,
            chatId: savedChat.chatId,
        });

        console.log(message)
        const savedMessage = await message.save();

        savedChat.messages.push(savedMessage._id);
        await savedChat.save();

        return savedChat.chatId;

    } catch (error) {
        console.log(error)
    }
}

export const getChatByChatId = async (chatId: string) => {
    await connectDB()
    const chat = await ChatModel.findOne({ chatId }).select("-__v -_id")
        .populate({
            path: "messages",
            select: "-__v -_id -chatId" // Exclude fields from messages
        })
        .lean()
        .exec();

    if (!chat) return null;

    return {
        id: chat.chatId,
        title: chat.title,
        messages: chat.messages.map((message: any) => {
            if (message.from === "powder") {
                return {
                    from: "powder",
                    preface: message.preface,
                    codeLink: message.codeLink,
                    isGenerated: message.isGenerated,
                    codeBreakdown: message.codeBreakdown,
                    summary: message.summary,
                    createdAt: message.createdAt,
                } as PowderMessageType
            }
            else {
                return {
                    from: "user",
                    text: message.text,
                    createdAt: message.createdAt,
                } as UserMessageType;
            }
        }),
        createdAt: chat.createdAt,
    }
};

export const getAllChats = async () => {
    await connectDB()
    const chats = await ChatModel.find().select("-_id -__v").lean()
    const chat = chats.map((chat) => {
        return {
            id: chat.chatId,
            title: chat.title,
            createdAt: chat.createdAt
        }
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return chat
}