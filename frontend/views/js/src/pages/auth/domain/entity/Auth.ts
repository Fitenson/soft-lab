import BaseEntity from "@/core/domain/entity/BaseEntity";
import type { AuthModel } from "@/pages/auth/data/model/AuthModel";


export default class Auth extends BaseEntity<AuthModel> implements AuthModel {
    public UUID!: string;
    public username!: string;
    public fullName!: string;
    public email!: string;
    public password!: string;
    public profileImage!: string;


    constructor(data: Partial<AuthModel>) {
        super();
        Object.assign(this, data);
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
