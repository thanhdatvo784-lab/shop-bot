import { ButtonInteraction } from "discord.js";

import { Button } from "../../core/structures/button";

const button: Button = {
    customId: "order_cancel",

    async execute(interaction: ButtonInteraction) {
        await interaction.reply({
            content: "🚧 Chức năng hủy đơn đang được phát triển.",
            ephemeral: true,
        });
    },
};

export default button;