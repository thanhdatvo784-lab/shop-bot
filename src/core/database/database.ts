import mongoose from "mongoose";
import { config } from "../config/config";
import { logger } from "../logger/logger";

export async function connectDatabase(): Promise<void> {
    try {
        await mongoose.connect(config.database.uri);

        logger.info("✅ MongoDB Connected");
    } catch (error) {
        logger.error(`❌ MongoDB Connection Failed: ${error}`);

        process.exit(1);
    }
}