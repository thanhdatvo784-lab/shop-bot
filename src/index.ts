import "dotenv/config";

import { Client, GatewayIntentBits } from "discord.js";

import { config } from "./core/config/config";
import { connectDatabase } from "./core/database/database";
import { loadEvents } from "./core/loaders/event-loader";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

async function bootstrap() {
    await connectDatabase();

    await loadEvents(client);

    await client.login(config.discord.token);
}

bootstrap();