import BaseEntity from "@/core/domain/entity/BaseEntity.ts";
import type { DepartmentDTO } from "@/pages/department/data/dto/DepartmentDTO.ts";
import DepartmentViewModel from "@/pages/department/presentation/view-models/DepartmentViewModel.ts";


export default class DepartmentEntity extends BaseEntity<DepartmentDTO> {
    private _UUID: string;
    private _departmentID: string;
    private _departmentName: string;
    private _head: string;
    private _headDepartmentName: string;
    private _description: string;
    private _valid: boolean;
    private _createdAtFormat: string;
    private _createdByName: string;
    private _updatedAtFormat: string;
    private _updatedByName: string;


    constructor(data: Partial<DepartmentDTO>) {
        super(data);
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


    asViewModel(): DepartmentViewModel {
        return new DepartmentViewModel(this.asDto());
    }

    get UUID(): string {
        return this._UUID;
    }

    set UUID(value: string) {
        this._UUID = value;
    }

    get departmentID(): string {
        return this._departmentID;
    }

    set departmentID(value: string) {
        this._departmentID = value;
    }

    get departmentName(): string {
        return this._departmentName;
    }

    set departmentName(value: string) {
        this._departmentName = value;
    }

    get head(): string {
        return this._head;
    }

    set head(value: string) {
        this._head = value;
    }

    get headDepartmentName(): string {
        return this._headDepartmentName;
    }

    set headDepartmentName(value: string) {
        this._headDepartmentName = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
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
