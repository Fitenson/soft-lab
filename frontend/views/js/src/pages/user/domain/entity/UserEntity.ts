import BaseEntity from "@/core/domain/entity/BaseEntity";
import type { UserModel } from "@/pages/user/data/models/UserModel";


export default class User extends BaseEntity<UserModel> {
    private UUID: string;
    private username: string;
    private fullName: string;
    private email: string;
    private title: string;
    private profileImage: string;
    private description: string;
    private address: string;
    private gender: string;
    private phoneNo: string;
    private valid: boolean;
    private createdAtFormat: string;
    private createdByName: string;
    private updatedAtFormat: string;
    private updatedByName: string;


    static readonly usernameMax = 100;
    static readonly fullNameMax = 255;
    static readonly emailMax = 255;
    static readonly titleMax = 255;
    static readonly descriptionMax = 500;
    static readonly addressMax = 500;
    static readonly genderMax = 50;
    static readonly phoneNoMax = 100;


    constructor(data: Partial<UserModel>) {
        super(data);
        this.UUID = data.UUID ?? "";
        this.username = data.username ?? "";
        this.fullName = data.fullName ?? "";
        this.email = data.email ?? "";
        this.title = data.title ?? "";
        this.profileImage = data.profileImage ?? "";
        this.description = data.description ?? "";
        this.address = data.address ?? "";
        this.gender = data.gender ?? "";
        this.phoneNo = data.phoneNo ?? "";
        this.valid = data.valid ?? true;
        this.createdAtFormat = data.createdAtFormat ?? "";
        this.createdByName = data.createdByName ?? "";
        this.updatedAtFormat = data.updatedAtFormat ?? "";
        this.updatedByName = data.updatedByName ?? "";
    }


    setUUID(UUID: string): void
    {
        this.UUID = UUID;
    }

    setUsername(username: string): void
    {
        this.username = username;
    }

    setFullName(fullName: string): void
    {
        this.fullName = fullName;
    }

    setProfileImage(profileImage: string): void
    {
        this.profileImage = profileImage;
    }

    setEmail(email: string): void
    {
        this.email = email;
    }

    setDescription(description: string): void
    {
        this.description = description;
    }

    setAddress(address: string): void
    {
        this.address = address;
    }

    setGender(gender: string): void
    {
        this.gender = gender;
    }

    setTitle(title: string): void
    {
        this.title = title;
    }

    setPhoneNo(phoneNo: string): void
    {
        this.phoneNo = phoneNo;
    }

    setValid(valid: boolean): void
    {
        this.valid = valid;
    }


    getUUID(): string
    {
        return this.UUID;
    }

    getUsername(): string
    {
        return this.username;
    }

    getFullName(): string
    {
        return this.fullName;
    }

    getProfileImage(): string
    {
        return this.profileImage;
    }

    getEmail(): string
    {
        return this.email;
    }

    getDescription(): string
    {
        return this.description;
    }

    getAddress(): string
    {
        return this.address;
    }

    getGender(): string
    {
        return this.gender;
    }

    getTitle(): string
    {
        return this.title;
    }

    getPhoneNo(): string
    {
        return this.phoneNo;
    }

    getValid(): boolean
    {
        return this.valid;
    }

    getCreatedAtFormat(): string
    {
        return this.createdAtFormat;
    }

    getCreatedByName(): string
    {
        return this.createdByName;
    }

    getUpdatedAtFormat(): string
    {
        return this.updatedAtFormat;
    }

    getUpdatedByName(): string
    {
        return this.updatedByName;
    }
}
