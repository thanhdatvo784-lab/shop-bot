import { Schema, model } from "mongoose";
import { AccountStatus, UserRole } from "./profile.types";

const profileSchema = new Schema(
    {
        discordId: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
        },
       
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.USER,
        },
        status: {
            type: String,
            enum: Object.values(AccountStatus),
            default: AccountStatus.ACTIVE,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const ProfileModel = model("Profile", profileSchema);