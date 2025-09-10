export default class AuthViewModel {
    private readonly _username: string;
    private readonly _fullName: string;
    private readonly _email: string;
    private readonly _password: string;
    private readonly _profileImage: string;


    constructor(username: string, fullName: string, email: string, password: string, profileImage: string) {
        this._username = username;
        this._fullName = fullName;
        this._email = email;
        this._password = password;
        this._profileImage = profileImage;
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
}
