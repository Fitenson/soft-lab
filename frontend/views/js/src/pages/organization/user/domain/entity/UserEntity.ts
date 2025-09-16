import BaseEntity from "@/core/domain/entity/BaseEntity.ts";
import type { UserDTO } from "@/pages/organization/user/data/dto/UserDTO.ts";
import UserViewModel from "@/pages/organization/user/presentation/view-models/UserViewModel.ts";


export default class UserEntity extends BaseEntity<UserDTO> {
    private _UUID: string;
    private _username: string;
    private _fullName: string;
    private _email: string;
    private _title: string;
    private _profileImage: string;
    private _description: string;
    private _address: string;
    private _gender: string;
    private _phoneNo: string;
    private _valid: boolean;
    private _createdAtFormat: string;
    private _createdByName: string;
    private _updatedAtFormat: string;
    private _updatedByName: string;


    constructor(data: Partial<UserDTO>) {
        super(data);
        this._UUID = data.UUID ?? "";
        this._username = data.username ?? "";
        this._fullName = data.fullName ?? "";
        this._email = data.email ?? "";
        this._title = data.title ?? "";
        this._profileImage = data.profileImage ?? "";
        this._description = data.description ?? "";
        this._address = data.address ?? "";
        this._gender = data.gender ?? "";
        this._phoneNo = data.phoneNo ?? "";
        this._valid = data.valid ?? true;
        this._createdAtFormat = data.createdAtFormat ?? "";
        this._createdByName = data.createdByName ?? "";
        this._updatedAtFormat = data.updatedAtFormat ?? "";
        this._updatedByName = data.updatedByName ?? "";
    }
    

    asViewModel(): UserViewModel {
        return new UserViewModel(this.asDto());
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

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get profileImage(): string {
        return this._profileImage;
    }

    set profileImage(value: string) {
        this._profileImage = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get address(): string {
        return this._address;
    }

    set address(value: string) {
        this._address = value;
    }

    get gender(): string {
        return this._gender;
    }

    set gender(value: string) {
        this._gender = value;
    }

    get phoneNo(): string {
        return this._phoneNo;
    }

    set phoneNo(value: string) {
        this._phoneNo = value;
    }

    get valid(): boolean {
        return this._valid;
    }

    set valid(value: boolean) {
        this._valid = value;
    }

    get createdAtFormat(): string {
        return this._createdAtFormat;
    }

    set createdAtFormat(value: string) {
        this._createdAtFormat = value;
    }

    get createdByName(): string {
        return this._createdByName;
    }

    set createdByName(value: string) {
        this._createdByName = value;
    }

    get updatedAtFormat(): string {
        return this._updatedAtFormat;
    }

    set updatedAtFormat(value: string) {
        this._updatedAtFormat = value;
    }

    get updatedByName(): string {
        return this._updatedByName;
    }

    set updatedByName(value: string) {
        this._updatedByName = value;
    }
}
