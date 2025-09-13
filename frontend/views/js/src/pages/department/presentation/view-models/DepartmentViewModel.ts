import type { DepartmentDTO } from "@/pages/department/data/dto/DepartmentDTO";

export default class DepartmentViewModel {
    private readonly _UUID: string;
    private readonly _departmentID: string;
    private readonly _departmentName: string;
    private readonly _head: string;
    private readonly _headDepartmentName: string;
    private readonly _description: string;
    private readonly _valid: boolean;
    private readonly _createdAtFormat: string;
    private readonly _createdByName: string;
    private readonly _updatedAtFormat: string;
    private readonly _updatedByName: string;


    constructor(data: Partial<DepartmentDTO>) {
        this._UUID = data.UUID ?? "";
        this._departmentID = data.departmentID ?? "";
        this._departmentName = data.departmentName ?? "";
        this._head = data.head ?? "";
        this._headDepartmentName = data.headDepartmentName ?? "";
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

    get departmentID(): string {
        return this._departmentID;
    }

    get departmentName(): string {
        return this._departmentName;
    }

    get head(): string {
        return this._head;
    }

    get headDepartmentName(): string {
        return this._headDepartmentName;
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
