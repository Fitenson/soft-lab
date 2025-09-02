import BaseEntity from "@/core/domain/entity/BaseEntity";
import type { AuthModel } from "@/pages/auth/data/model/AuthModel";


export default class Auth extends BaseEntity<AuthModel> implements AuthModel {
    public UUID!: string;
    public username!: string;
    public email!: string;
    // public accessToken!: string;


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

    // setAccessToken()
}
