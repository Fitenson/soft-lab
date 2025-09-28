import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";


export default class ApiTestViewModel {
    private _UUID: string;
    private _parentApiTest: string;
    private _clientDatabase: string;
    private _project: string;
    private _isFolder: boolean;
    private _testName: string;
    private _transmission: string;
    private _description: string;
    private _moreDescription: string;
    private _data: string;
    private _output: string;
    private _scenario: string;
    private _apiTests: ApiTestViewModel[];
    private _apiDTO: Partial<ApiTestDTO>;


    constructor(data: Partial<ApiTestDTO>) {
        this._UUID = data.UUID ?? "";
        this._parentApiTest = data.parentApiTest ?? "";
        this._clientDatabase = data.clientDatabase ?? "";
        this._project = data.project ?? "";
        this._testName = data.testName ?? "";
        this._transmission = data.transmission ?? "";
        this._isFolder = data.isFolder ?? false;
        this._description = data.description ?? "";
        this._moreDescription = data.moreDescription ?? "";
        this._data = data.data ?? "";
        this._output = data.output ?? "";
        this._scenario = data.scenario ?? "";
        this._apiTests = (data.apiTests ?? []).map((dto) => new ApiTestViewModel(dto));
        this._apiDTO = data;
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

    get data(): string {
        return this._data;
    }

    get output(): string {
        return this._output;
    }

    get scenario(): string {
        return this._scenario;
    }

    get isFolder(): boolean {
        return this._isFolder;
    }

    get apiTests(): ApiTestViewModel[] {
        return this._apiTests;
    }

    get apiDTO(): Partial<ApiTestDTO> {
        return this._apiDTO;
    }
}
