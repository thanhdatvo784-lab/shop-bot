import "dotenv/config";

import { REST, Routes } from "discord.js";
import path from "node:path";

import { config } from "./core/config/config";
import { loadFiles } from "./core/utils/file-loader";

async function deployCommands() {
    const commandsPath = path.join(process.cwd(), "src", "commands");

    const modules = await loadFiles(commandsPath);

    const commands = modules.map((module) =>
        module.default.data.toJSON()
    );

    const rest = new REST({
        version: "10",
    }).setToken(config.discord.token);

    await rest.put(
        Routes.applicationGuildCommands(
            config.discord.clientId,
            config.discord.guildId
        ),
        {
            body: commands,
        }
    );

    console.log(`✅ ${commands.length} command(s) deployed.`);
}

deployCommands().catch(console.error);