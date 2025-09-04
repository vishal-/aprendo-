export interface UserDetails {
    uid: string;
    email: string;
    profilePicture: string;
    phone: string;
    phoneVerified: boolean;
    termsAccepted: boolean;
    termsAcceptedAt: Date;
    createdAt: Date;
    displayName: string;
    role: UserRole;
}

enum UserRole {
    ADMIN = "admin",
    PARENT = "parent",
    TUTOR = "tutor",
    STUDENT = "student",
    MODERATOR = "moderator",
    ACADEMY = "academy",
}