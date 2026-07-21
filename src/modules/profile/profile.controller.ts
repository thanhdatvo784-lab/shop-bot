import { profileService } from "./profile.service";

export class ProfileController {
    async initializeProfile(discordId: string, username: string) {
        return profileService.getOrCreateProfile(discordId, username);
    }

   
}

export const profileController = new ProfileController();