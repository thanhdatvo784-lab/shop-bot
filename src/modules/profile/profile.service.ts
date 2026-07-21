import { profileRepository } from "./profile.repository";

export class ProfileService {
    async getOrCreateProfile(discordId: string, username: string) {
        let profile = await profileRepository.findByDiscordId(discordId);

        if (!profile) {
            profile = await profileRepository.create({
                discordId,
                username,
            });
        }

        if (profile.username !== username) {
            profile = await profileRepository.updateUsername(
                discordId,
                username
            );
        }
        if (!profile) {
    throw new Error("Failed to initialize profile");
}

        return profile;
    }

   
}

export const profileService = new ProfileService();