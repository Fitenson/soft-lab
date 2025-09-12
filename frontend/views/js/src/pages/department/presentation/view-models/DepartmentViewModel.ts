import type { DepartmentDTO } from "@/pages/department/data/dto/DepartmentDTO";

export default class DepartmentViewModel {
    private readonly _UUID: string;
    private readonly _username: string;
    private readonly _email: string;
    private readonly _fullName: string;
    private readonly _phoneNo: string;
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


    constructor(data: Partial<DepartmentDTO>) {
        this._UUID = data.UUID ?? "";
        this._username = data.username ?? "";
        this._email = data.email ?? "";
        this._fullName = data.fullName ?? "";
        this._phoneNo = data.phoneNo ?? "";
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
}
