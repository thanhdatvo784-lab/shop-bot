import { ButtonInteraction } from "discord.js";

import { Button } from "../../core/structures/button";

const button: Button = {
    customId: "order_complete",

    async execute(interaction: ButtonInteraction) {
        await interaction.reply({
            content: "🚧 Chức năng hoàn thành đơn đang được phát triển.",
            ephemeral: true,
        });
    },
};

export default button;