import { readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export async function loadFiles(directory: string): Promise<any[]> {
    const entries = await readdir(directory, {
        withFileTypes: true,
    });

    const modules: any[] = [];

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            modules.push(...await loadFiles(fullPath));
            continue;
        }

        if (!entry.name.endsWith(".ts") && !entry.name.endsWith(".js")) {
            continue;
        }

        modules.push(
            await import(pathToFileURL(fullPath).href)
        );
    }

    return modules;
}