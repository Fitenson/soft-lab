import BaseEntity from "@/core/domain/entity/BaseEntity.ts";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";


export default class ApiTestEntity extends BaseEntity<ApiTestDTO>{
    private _UUID: string;
    private _parentApiTest: string;
    private _clientDatabase: string;
    private _project: string;
    private _testName: string;
    private _isFolder: boolean;
    private _transmission: string;
    private _description: string;
    private _moreDescription: string;
    private _data: string;
    private _output: string;
    private _scenario: string;


    constructor(model: Partial<ApiTestDTO>) {
        super(model);
        this._UUID = model.UUID ?? "";
        this._parentApiTest = model.parentApiTest ?? "";
        this._clientDatabase = model.clientDatabase ?? "";
        this._project = model.project ?? "";
        this._testName = model.testName ?? "";
        this._isFolder = model.isFolder ?? false;
        this._transmission = model.transmission ?? "";
        this._description = model.description ?? "";
        this._moreDescription = model.moreDescription ?? "";
        this._data = model.data ?? "";
        this._output = model.output ?? "";
        this._scenario = model.scenario ?? "";
    }

    asViewModel(): ApiTestViewModel {
        return new ApiTestViewModel(this.asDto());
    }


    get UUID(): string {
        return this._UUID;
    }

    set UUID(value: string) {
        this._UUID = value;
    }

    get parentApiTest(): string {
        return this._parentApiTest;
    }

    set parentApiTest(value: string) {
        this._parentApiTest = value;
    }

    get clientDatabase(): string {
        return this._clientDatabase;
    }

    set clientDatabase(value: string) {
        this._clientDatabase = value;
    }

    get project(): string {
        return this._project;
    }

    set project(value: string) {
        this._project = value;
    }

    get testName(): string {
        return this._testName;
    }

    set testName(value: string) {
        this._testName = value;
    }

    get transmission(): string {
        return this._transmission;
    }

    set transmission(value: string) {
        this._transmission = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get moreDescription(): string {
        return this._moreDescription;
    }

    set moreDescription(value: string) {
        this._moreDescription = value;
    }

    get data(): string {
        return this._data;
    }

    set data(value: string) {
        this._data = value;
    }

    get output(): string {
        return this._output;
    }

    set output(value: string) {
        this._output = value;
    }

    get scenario(): string {
        return this._scenario;
    }

    set scenario(value: string) {
        this._scenario = value;
    }

    get isFolder(): boolean {
        return this._isFolder;
    }

    set isFolder(value: boolean) {
        this._isFolder = value;
    }
}
