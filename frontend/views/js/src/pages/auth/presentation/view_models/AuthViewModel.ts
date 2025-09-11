import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";


export default class AuthViewModel {
    private readonly _UUID: string;
    private readonly _username: string;
    private readonly _fullName: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _profileImage: string;


    constructor(data: Partial<AuthDTO>) {
        this._UUID = data.UUID ?? "";
        this._username = data.username ?? "";
        this._fullName = data.fullName ?? "";
        this._email = data.email ?? "";
        this._password = data.password ?? "";
        this._profileImage = data.profileImage ?? "";
    }


    get UUID(): string
    {
        return this._UUID;
    }

    get username(): string {
        return this._username;
    }

    get fullName(): string {
        return this._fullName;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }

    get profileImage(): string {
        return this._profileImage;
    }


    asJson() {
        return {
            UUID: this._UUID,
            username: this._username,
            fullName: this._fullName,
            email: this._email,
            password: this._password,
            profileImage: this._profileImage
        };
    }
}
