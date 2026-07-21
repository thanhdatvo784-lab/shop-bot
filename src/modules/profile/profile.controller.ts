import { profileService } from "./profile.service";

export class ProfileController {
    async initializeProfile(discordId: string, username: string) {
        return profileService.getOrCreateProfile(discordId, username);
    }

    async addBalance(discordId: string, amount: number) {
        return profileService.addBalance(discordId, amount);
    }
}

export const profileController = new ProfileController();