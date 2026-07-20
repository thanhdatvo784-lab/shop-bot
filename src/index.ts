import 'dotenv/config';
import { logger } from "./core/logger/logger";
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.once('ready', () => {
    logger.info(`🤖 ${client.user?.tag} is online!`);
});

client.login(process.env.DISCORD_TOKEN);