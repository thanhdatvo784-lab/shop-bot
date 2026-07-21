import { z } from "zod";

const envSchema = z.object({
    DISCORD_TOKEN: z.string().min(1, "DISCORD_TOKEN is required"),
    CLIENT_ID: z.string().min(1, "CLIENT_ID is required"),
    GUILD_ID: z.string().min(1, "GUILD_ID is required"),
    MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
});

const env = envSchema.parse(process.env);

export const config = {
    discord: {
        token: env.DISCORD_TOKEN,
        clientId: env.CLIENT_ID,
        guildId: env.GUILD_ID,
    },
    database: {
        uri: env.MONGODB_URI,
    },
} as const;