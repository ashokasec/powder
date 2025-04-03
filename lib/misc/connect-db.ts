import mongoose from "mongoose";
import { env } from "@/lib/misc/env";

const MONGODB_URI = env.MONGODB_URI;

export default async function connectDB(): Promise<void> {
    if (mongoose.connection.readyState === 1) {
        console.log("Database already connected.");
        return;
    }

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    try {
        console.log("Attempting to connect to the database...");
        await mongoose.connect(MONGODB_URI, {
            connectTimeoutMS: 10000,
        });
        console.log("Successfully connected to the database.");
    } catch (error: unknown) {
        console.error("Error connecting to the database:", (error as Error).message);

        const retrySeconds = 5;
        console.log(`Retrying connection in ${retrySeconds} seconds...`);

        setTimeout(async () => {
            try {
                await mongoose.connect(MONGODB_URI, {
                    connectTimeoutMS: 10000,
                });
                console.log("Successfully connected to the database on retry.");
            } catch (retryError: unknown) {
                console.error("Failed to connect to the database on retry:", (retryError as Error).message);
                process.exit(1);
            }
        }, retrySeconds * 1000);
    }
}