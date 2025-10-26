import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import ApiTestDataViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestDataViewModel.ts";


export default class ApiTestViewModel {
    private _UUID: string;
    private _parentApiTest: string;
    private _clientDatabase: string;
    private _project: string;
    private _isFolder: number;
    private _testName: string;
    private _transmission: string;
    private _description: string;
    private _moreDescription: string;
    private _apiTestData: ApiTestDataViewModel[];
    private _apiTests: ApiTestViewModel[];
    private _apiTestDTO: Partial<ApiTestDTO>;
    private _isNew: boolean;


    constructor(data: Partial<ApiTestDTO>) {
        this._UUID = data.UUID ?? "";
        this._parentApiTest = data.parentApiTest ?? "";
        this._clientDatabase = data.clientDatabase ?? "";
        this._project = data.project ?? "";
        this._testName = data.testName ?? "";
        this._transmission = data.transmission ?? "";
        this._isFolder = Number(data.isFolder ?? 0);
        this._description = data.description ?? "";
        this._moreDescription = data.moreDescription ?? "";

        this._apiTestData = (data.apiTestHasDatas ?? []).map(
            (dto) => new ApiTestDataViewModel(dto)
        );

        this._apiTests = (data.apiTests ?? []).map((dto) => new ApiTestViewModel(dto));
        this._apiTestDTO = data;
        this._isNew = data?.isNew ?? false;
    }


    get UUID(): string {
        return this._UUID;
    }

    get parentApiTest(): string {
        return this._parentApiTest;
    }

    get clientDatabase(): string {
        return this._clientDatabase;
    }

    get project(): string {
        return this._project;
    }

    get testName(): string {
        return this._testName;
    }

    get transmission(): string {
        return this._transmission;
    }

    get description(): string {
        return this._description;
    }

    get moreDescription(): string {
        return this._moreDescription;
    }

    get isFolder(): number {
        return this._isFolder;
    }

    get apiTestData(): ApiTestDataViewModel[] {
        return this._apiTestData;
    }

    get apiTests(): ApiTestViewModel[] {
        return this._apiTests;
    }

    get apiTestDTO(): Partial<ApiTestDTO> {
        return this._apiTestDTO;
    }

    get isNew(): boolean {
        return this._isNew;
    }
}

