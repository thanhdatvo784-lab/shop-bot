import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function loadFiles(directory: string) {
    const files = await readdir(directory);

    const modules = [];

    for (const file of files) {
        if (!file.endsWith(".ts") && !file.endsWith(".js")) {
            continue;
        }

        const filePath = path.join(directory, file);

        modules.push(
            await import(pathToFileURL(filePath).href)
        );
    }

    return modules;
}