import { nanoid } from "nanoid";
import { ChatModel, MessageModel } from "@/database/schema/chat"
import connectDB from "@/lib/misc/connect-db";
import { ChatType } from "@/lib/types/chat";

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

        const message = new MessageModel({
            role: "user",
            content: prompt,
            chatId: savedChat.chatId,
        });

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
        .lean<{ chatId: string; title: string; messages: ChatType[], createdAt: Date }>()
        .exec();

    if (!chat) return null;

    return {
        id: chat.chatId,
        title: chat.title,
        messages: chat.messages.map((item) => {
            return {
                role: item.role,
                content: item.content
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

export const createNewMessage = async ({ role, content, chatId }: { role: "assistant" | "user", content: string; chatId: string }) => {
    await connectDB()

    const chat = await ChatModel.findOne({ chatId })

    if (!chat) return null

    const message = new MessageModel({
        role,
        content,
        chatId,
    });

    const savedMessage = await message.save();

    chat.messages.push(savedMessage._id);
    await chat.save();

    return savedMessage.content as string;
}