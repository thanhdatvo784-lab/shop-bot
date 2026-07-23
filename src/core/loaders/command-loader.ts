import { Collection } from "discord.js";
import path from "node:path";

import { loadFiles } from "../utils/file-loader";
import { Command } from "../structures/command";

export async function loadCommands() {
    const commands = new Collection<string, Command>();

    const commandPath = path.join(process.cwd(), "src", "commands");

    const modules = await loadFiles(commandPath);

    for (const module of modules) {

        const command = module.default as Command;

        if (!command) {
            console.warn("⚠️ Một command không có export default.");
            continue;
        }

        if (!command.data) {
            console.warn("⚠️ Command thiếu data:", module);
            continue;
        }

        commands.set(command.data.name, command);
    }

    return commands;
}