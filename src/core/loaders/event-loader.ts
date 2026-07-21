import { Client } from "discord.js";
import path from "node:path";

import { loadFiles } from "../utils/file-loader";

export async function loadEvents(client: Client) {
    const eventsPath = path.join(process.cwd(), "src", "events");

    const modules = await loadFiles(eventsPath);

    for (const event of modules) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}