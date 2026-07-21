import { ProfileModel } from "./profile.model";

export class ProfileRepository {
    async findByDiscordId(discordId: string) {
        return ProfileModel.findOne({ discordId });
    }

    async create(data: {
        discordId: string;
        username: string;
    }) {
        return ProfileModel.create({
            ...data,
        });
    }

    async updateUsername(discordId: string, username: string) {
        return ProfileModel.findOneAndUpdate(
            { discordId },
            { username },
            { new: true }
        );
    }

    async addBalance(discordId: string, amount: number) {
        return ProfileModel.findOneAndUpdate(
            { discordId },
            { $inc: { balance: amount } },
            { new: true }
        );
    }
}

export const profileRepository = new ProfileRepository();