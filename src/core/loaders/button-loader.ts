import path from "node:path";

import { loadFiles } from "../utils/file-loader";
import { Button } from "../structures/button";

export async function loadButtons() {
    const buttonsPath = path.join(
        process.cwd(),
        "src",
        "interactions",
        "buttons"
    );

    const modules = await loadFiles(buttonsPath);

    const buttons = new Map<string, Button>();

 for (const module of modules) {

    const button = module.default;

    if (!button) continue;

    buttons.set(button.customId, button);
}

    return buttons;
}