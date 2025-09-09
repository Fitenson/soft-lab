import BaseEntity from "@/core/domain/entity/BaseEntity";
import type { AuthModel } from "@/pages/auth/data/model/AuthModel";


export default class Auth extends BaseEntity<AuthModel> {
    private UUID: string;
    private username: string;
    private fullName: string;
    private email: string;
    private password: string;
    private profileImage: string;


    constructor(data: Partial<AuthModel>) {
        super();
        this.UUID = data.UUID ?? "";
        this.username = data.username ?? "";
        this.fullName = data.fullName ?? "";
        this.email = data.email ?? "";
        this.password = data.password ?? "";
        this.profileImage = data.profileImage ?? "";
    }


    setUUID(UUID: string): void
    {
        this.UUID = UUID;
    }

    setUsername(username: string): void
    {
        this.username = username;
    }

    setEmail(email: string): void
    {
        this.email = email;
    }

    setPassword(password: string): void
    {
        this.password = password;
    }

    setProfileImage(profileImage: string): void
    {
        this.profileImage = profileImage;
    }


    getUsername(): string
    {
        return this.username;
    }

    getFullName(): string
    {
        return this.fullName;
    }

    getEmail(): string
    {
        return this.email;
    }

    getPassword(): string
    {
        return this.password;
    }

    getProfileImage(): string
    {
        return this.profileImage;
    }


    asJson() {
        return {
            UUID: this.UUID,
            username: this.username,
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            profileImage: this.profileImage
        };
    }

    
    static fromJson(json: string): Auth
    {
        const data = JSON.parse(json);
        return new Auth(data);
    }
}
