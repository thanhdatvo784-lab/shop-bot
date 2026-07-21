export enum AccountStatus {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    BANNED = "BANNED",
}

export enum UserRole {
    USER = "USER",
    STAFF = "STAFF",
    ADMIN = "ADMIN",
    OWNER = "OWNER",
}

export interface Profile {
    discordId: string;
    username: string;
    balance: number;
    role: UserRole;
    status: AccountStatus;
    createdAt: Date;
    updatedAt: Date;
}