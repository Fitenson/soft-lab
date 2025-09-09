import BaseEntity from "@/core/domain/entity/BaseEntity";
import type { UserModel } from "@/pages/user/data/models/UserModel";


export default class User extends BaseEntity<UserModel> implements UserModel {
    public UUID!: string;
    public username!: string;
    public fullName!: string;
    public email!: string;
    public title!: string;
    public profileImage!: string;
    public description!: string;
    public address!: string;
    public gender!: string;
    public phoneNo!: string;
    public valid!: boolean;
    public createdAtFormat!: string;
    public createdByName!: string;
    public updatedAtFormat!: string;
    public updatedByName!: string;

    constructor(data: Partial<UserModel>) {
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
}
