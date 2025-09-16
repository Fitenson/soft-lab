import type {ProjectDTO} from "@/pages/project_management/project/data/dto/ProjectDTO.ts";

export default class ProjectViewModel {
    private readonly _UUID: string;
    private readonly _projectName: string;
    private readonly _projectCode: string;
    private readonly _description: string;
    private readonly _secondDescription: string;
    private readonly _moreDescription: string;
    private readonly _valid: boolean;
    private readonly _createdAtFormat: string;
    private readonly _createdByName: string;
    private readonly _updatedAtFormat: string;
    private readonly _updatedByName: string;


    constructor(data: Partial<ProjectDTO>) {
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


    get UUID(): string {
        return this._UUID;
    }

    get projectName(): string {
        return this._projectName;
    }

    get projectCode(): string {
        return this._projectCode;
    }

    get description(): string {
        return this._description;
    }

    get secondDescription(): string {
        return this._secondDescription;
    }

    get moreDescription(): string {
        return this._moreDescription;
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
