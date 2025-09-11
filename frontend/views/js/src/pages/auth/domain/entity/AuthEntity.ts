import BaseEntity from "@/core/domain/entity/BaseEntity";
import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";


export default class AuthEntity extends BaseEntity<AuthDTO> {
    private _UUID: string;
    private _username: string;
    private _fullName: string;
    private _email: string;
    private _password: string;
    private _profileImage: string;


    constructor(data: Partial<AuthDTO>) {
        super(data);
        this._UUID = data.UUID ?? "";
        this._username = data.username ?? "";
        this._fullName = data.fullName ?? "";
        this._email = data.email ?? "";
        this._password = data.password ?? "";
        this._profileImage = data.profileImage ?? "";
    }


    get UUID(): string {
        return this._UUID;
    }

    set UUID(value: string) {
        this._UUID = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get profileImage(): string {
        return this._profileImage;
    }

    set profileImage(value: string) {
        this._profileImage = value;
    }

    asDto(): Partial<AuthDTO> {
        return super.asDto();
    }

    asViewModel(): AuthViewModel {
        return new AuthViewModel(this.asDto());
    }
}
