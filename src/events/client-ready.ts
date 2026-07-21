import { Client } from "discord.js";
import { logger } from "../core/logger/logger";

export const name = "clientReady";
export const once = true;

export async function execute(client: Client) {
logger.info(`🤖 ${client.user?.tag} is online!`);}