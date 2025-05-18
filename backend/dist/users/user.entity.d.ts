export declare enum UserRole {
    USER = "user",
    MODERATOR = "moderator"
}
export declare class User {
    userId: number;
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    role: UserRole;
}
