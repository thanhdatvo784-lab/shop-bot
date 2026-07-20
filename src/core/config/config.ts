import { z } from "zod";

const envSchema = z.object({
    DISCORD_TOKEN: z.string().min(1, "DISCORD_TOKEN is required"),
});

const env = envSchema.parse(process.env);

export const config = {
    discord: {
        token: env.DISCORD_TOKEN,
    },
} as const;