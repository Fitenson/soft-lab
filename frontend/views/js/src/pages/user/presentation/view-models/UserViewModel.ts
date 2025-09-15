import type { UserDTO } from "../../data/dto/UserDTO";


export default class UserViewModel {
    private readonly _UUID: string;
    private readonly _username: string;
    private readonly _email: string;
    private readonly _fullName: string;
    private readonly _phoneNo: string;
    private readonly _role: string;
    private readonly _profileImage: string;
    private readonly _title: string;
    private readonly _gender: string;
    private readonly _address: string;
    private readonly _description: string;
    private readonly _valid: boolean;
    private readonly _createdAtFormat: string;
    private readonly _createdByName: string;
    private readonly _updatedAtFormat: string;
    private readonly _updatedByName: string;


    constructor(data: Partial<UserDTO>) {
        this._UUID = data.UUID ?? "";
        this._username = data.username ?? "";
        this._email = data.email ?? "";
        this._fullName = data.fullName ?? "";
        this._phoneNo = data.phoneNo ?? "";
        this._role = data.role ?? "";
        this._profileImage = data.profileImage ?? "";
        this._title = data.title ?? "";
        this._gender = data.gender ?? "";
        this._address = data.address ?? "";
        this._description = data.description ?? "";
        this._valid = data.valid ?? true;
        this._createdAtFormat = data.createdAtFormat ?? "";
        this._createdByName = data.createdByName ?? "";
        this._updatedAtFormat = data.updatedAtFormat ?? "";
        this._updatedByName = data.updatedByName ?? "";
    }


    get UUID(): string {
        return this._UUID;
    }

    get username(): string {
        return this._username;
    }

    get email(): string {
        return this._email;
    }

    get fullName(): string {
        return this._fullName;
    }

    get phoneNo(): string {
        return this._phoneNo;
    }

    get role(): string {
        return this._role;
    }

    get profileImage(): string {
        return this._profileImage;
    }

    get title(): string {
        return this._title;
    }

    get gender(): string {
        return this._gender;
    }

    get address(): string {
        return this._address;
    }

    get description(): string {
        return this._description;
    }

    get valid(): boolean {
        return this._valid;
    }

    get createdAtFormat(): string {
        return this._createdAtFormat;
    }

    get createdByName(): string {
        return this._createdByName;
    }

    get updatedAtFormat(): string {
        return this._updatedAtFormat;
    }

    get updatedByName(): string {
        return this._updatedByName;
    }
}
