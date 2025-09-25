import  ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import type { ProjectDTO } from "@/pages/project_management/project/data/dto/ProjectDTO.ts";


export default class ProjectListViewModel {
    private _UUID: string;
    private _projectCode: string;
    private _projectName: string;
    private _clientDatabases: ClientDatabaseViewModel[]

    constructor(data: Partial<ProjectDTO>, clientDatabases: ClientDatabaseViewModel[]) {
        this._UUID = data?.UUID ?? "";
        this._projectCode = data?.projectCode ?? "";
        this._projectName = data?.projectName ?? "";
        this._clientDatabases = clientDatabases;
    }


    get UUID(): string {
        return this._UUID;
    }

    get projectCode(): string {
        return this._projectCode;
    }

    get projectName(): string {
        return this._projectName;
    }

    get clientDatabases(): ClientDatabaseViewModel[] {
        return this._clientDatabases;
    }
}
