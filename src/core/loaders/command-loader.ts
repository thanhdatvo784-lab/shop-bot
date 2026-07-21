import { Collection } from "discord.js";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { Command } from "../structures/command";
import { pathToFileURL } from "node:url";

export async function loadCommands() {
    const commands = new Collection<string, Command>();

    const commandsPath = path.join(process.cwd(), "src", "commands");

    const files = await readdir(commandsPath);

    for (const file of files) {
        if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

const filePath = path.join(commandsPath, file);

const command = await import(pathToFileURL(filePath).href);
        commands.set(command.default.data.name, command.default);
    }

    return commands;
}