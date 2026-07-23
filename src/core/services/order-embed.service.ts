import {
    EmbedBuilder,
    User,
} from "discord.js";

export class OrderEmbedService {

    pending(
        orderId: string,
        user: User,
        productName: string,
        price: number
    ) {
        return new EmbedBuilder()
            .setColor(0xF1C40F)
            .setTitle("🛒 ĐƠN HÀNG MỚI")
            .addFields(
                {
                    name: "👤 Khách hàng",
                    value: `${user}`,
                    inline: true,
                },
                {
                    name: "🆔 Order",
                    value: orderId,
                    inline: true,
                },
                {
                    name: "📦 Sản phẩm",
                    value: productName,
                },
                {
                    name: "💰 Giá",
                    value: `${price.toLocaleString()} Credit`,
                    inline: true,
                },
                {
                    name: "📌 Trạng thái",
                    value: "🟡 Chờ nhận xử lý",
                    inline: true,
                }
            )
            .setFooter({
                text: `Order • ${orderId}`,
            })
            .setTimestamp();
    }

    processing(
        orderId: string,
        user: User,
        staff: User,
        productName: string,
        price: number
    ) {
        return new EmbedBuilder()
            .setColor(0xE67E22)
            .setTitle("🟠 ĐƠN HÀNG ĐANG XỬ LÝ")
            .addFields(
                {
                    name: "👤 Khách hàng",
                    value: `${user}`,
                    inline: true,
                },
                {
                    name: "👮 Nhân viên",
                    value: `${staff}`,
                    inline: true,
                },
                {
                    name: "🆔 Order",
                    value: orderId,
                },
                {
                    name: "📦 Sản phẩm",
                    value: productName,
                },
                {
                    name: "💰 Giá",
                    value: `${price.toLocaleString()} Credit`,
                    inline: true,
                },
                {
                    name: "📌 Trạng thái",
                    value: "🟠 Đang xử lý",
                    inline: true,
                }
            )
            .setFooter({
                text: `Order • ${orderId}`,
            })
            .setTimestamp();
    }

    completed(
        orderId: string,
        user: User,
        staff: User,
        productName: string,
        price: number
    ) {
        return new EmbedBuilder()
            .setColor(0x2ECC71)
            .setTitle("✅ ĐƠN HÀNG HOÀN THÀNH")
            .addFields(
                {
                    name: "👤 Khách hàng",
                    value: `${user}`,
                    inline: true,
                },
                {
                    name: "👮 Nhân viên",
                    value: `${staff}`,
                    inline: true,
                },
                {
                    name: "🆔 Order",
                    value: orderId,
                },
                {
                    name: "📦 Sản phẩm",
                    value: productName,
                },
                {
                    name: "💰 Giá",
                    value: `${price.toLocaleString()} Credit`,
                    inline: true,
                },
                {
                    name: "📌 Trạng thái",
                    value: "🟢 Hoàn thành",
                    inline: true,
                }
            )
            .setFooter({
                text: `Order • ${orderId}`,
            })
            .setTimestamp();
    }

    cancelled(
        orderId: string,
        user: User,
        staff: User,
        productName: string,
        price: number,
        reason: string
    ) {
        return new EmbedBuilder()
            .setColor(0xE74C3C)
            .setTitle("❌ ĐƠN HÀNG ĐÃ HỦY")
            .addFields(
                {
                    name: "👤 Khách hàng",
                    value: `${user}`,
                    inline: true,
                },
                {
                    name: "👮 Nhân viên",
                    value: `${staff}`,
                    inline: true,
                },
                {
                    name: "🆔 Order",
                    value: orderId,
                },
                {
                    name: "📦 Sản phẩm",
                    value: productName,
                },
                {
                    name: "💰 Giá",
                    value: `${price.toLocaleString()} Credit`,
                    inline: true,
                },
                {
                    name: "📝 Lý do hủy",
                    value: reason,
                },
                {
                    name: "📌 Trạng thái",
                    value: "🔴 Đã hủy",
                    inline: true,
                }
            )
            .setFooter({
                text: `Order • ${orderId}`,
            })
            .setTimestamp();
    }
}

export const orderEmbedService = new OrderEmbedService();