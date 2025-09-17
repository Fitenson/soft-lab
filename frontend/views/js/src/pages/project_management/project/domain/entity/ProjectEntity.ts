import BaseEntity from "@/core/domain/entity/BaseEntity.ts";
import type { ProjectDTO } from "@/pages/project_management/project/data/dto/ProjectDTO.ts";
import ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel.ts";


export default class ProjectEntity extends BaseEntity<ProjectDTO>{
    private _UUID: string;
    private _projectName: string;
    private _projectCode: string;
    private _description: string;
    private _secondDescription: string;
    private _moreDescription: string;
    private _valid: boolean;
    private _createdAtFormat: string;
    private _createdByName: string;
    private _updatedAtFormat: string;
    private _updatedByName: string;


    constructor(data: Partial<ProjectDTO>) {
        super(data);
        this._UUID = data.UUID ?? "";
        this._projectName = data.projectName ?? "";
        this._projectCode = data.projectCode ?? "";
        this._description = data.description ?? "";
        this._secondDescription = data.secondDescription ?? "";
        this._moreDescription = data.moreDescription ?? "";
        this._valid = data.valid ?? true;
        this._createdAtFormat = data.createdAtFormat ?? "";
        this._createdByName = data.createdByName ?? "";
        this._updatedAtFormat = data.updatedAtFormat ?? "";
        this._updatedByName = data.updatedByName ?? "";
    }


    asViewModel(): ProjectViewModel {
        return new ProjectViewModel(this.asDto());
    }

    get UUID(): string {
        return this._UUID;
    }

    set UUID(value: string) {
        this._UUID = value;
    }

    get projectName(): string {
        return this._projectName;
    }

    set projectName(value: string) {
        this._projectName = value;
    }

    get projectCode(): string {
        return this._projectCode;
    }

    set projectCode(value: string) {
        this._projectCode = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get secondDescription(): string {
        return this._secondDescription;
    }

    set secondDescription(value: string) {
        this._secondDescription = value;
    }

    get moreDescription(): string {
        return this._moreDescription;
    }

    set moreDescription(value: string) {
        this._moreDescription = value;
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
