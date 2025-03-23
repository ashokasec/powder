import { Chat } from "@/lib/db/schema/chat"
import { IMessage, Message } from "@/lib/db/schema/message"
import connectDB from "@/lib/misc/connect-db";
import { nanoid } from "@/lib/utils";
import { Message as AIMessage } from "ai";

export const createChatDB = async (title: string) => {
    await connectDB()
    const chatId = nanoid(12);

    try {

        const chat = new Chat({
            chatId,
            title,
            messages: [],
        });

        const savedChat = await chat.save();

        const message = new Message({
            message: prompt,
            chatId: savedChat.id,
        });

        const savedMessage = await message.save();

        savedChat.messages.push(savedMessage._id);
        await savedChat.save();

        return savedChat.id;

    } catch (error) {
        console.log(error)
    }
}

export async function getChatsDB() {
    await connectDB()
    const chats = await Chat.find().select("-__v -_id -messages")
    return chats.map((chat) => ({
        id: chat.id as string,
        title: chat.title,
        createdAt: chat.createdAt
    }));
}

export const getChatByIdDB = async ({ chatId }: { chatId: string }) => {
    await connectDB()
    const chat = await Chat.findOne({ id: chatId }).select("-__v -_id")
        .populate({
            path: "messages",
            select: "-__v -_id -chatId"
        })
        .lean<{ id: string; title: string; messages: IMessage[], createdAt: Date }>()
        .exec();

    if (!chat) return null;

    return {
        id: chat.id,
        title: chat.title,
        messages: chat.messages as IMessage[],
        createdAt: chat.createdAt,
    }
};

export const createMessageDB = async ({ message, chatId }: { message: IMessage["message"]; chatId: string }) => {
    await connectDB()

    const chat = await Chat.findOne({ id: chatId })

    if (!chat) return null

    const newMessage = new Message({
        id: message.id,
        message,
        chatId,
    });

    const savedMessage = await newMessage.save() as IMessage;

    chat.messages.push(savedMessage._id);
    await chat.save();

    return savedMessage.message as AIMessage;
}