import BaseEntity from "@/core/domain/entity/BaseEntity.ts";
import type { ApiTestDTO } from "@/pages/backend/api_test/data/dto/ApiTestDTO.ts";
import ApiTestViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestViewModel.ts";
import ApiTestDataEntity from "@/pages/backend/api_test/domain/entity/ApiTestDataEntity.ts";
import type {DataTableType} from "@/types";


export default class ApiTestEntity extends BaseEntity<ApiTestDTO>{
    private _UUID: string;
    private _parentApiTest: string;
    private _clientDatabase: string;
    private _project: string;
    private _testName: string;
    private _isFolder: number;
    private _transmission: string;
    private _description: string;
    private _moreDescription: string;
    private _apiTestData: DataTableType<ApiTestDataEntity>;
    private _apiTests: ApiTestEntity[]


    constructor(model: Partial<ApiTestDTO>) {
        super(model);
        this._UUID = model.UUID ?? "";
        this._parentApiTest = model.parentApiTest ?? "";
        this._clientDatabase = model.clientDatabase ?? "";
        this._project = model.project ?? "";
        this._testName = model.testName ?? "";
        this._isFolder = Number(model.isFolder ?? 0);
        this._transmission = model.transmission ?? "";
        this._description = model.description ?? "";
        this._moreDescription = model.moreDescription ?? "";
        this._apiTestData = {
            total: model.apiTestData?.total ?? "0",
            rows: (model.apiTestData?.rows ?? []).map(
                (dto) => new ApiTestDataEntity(dto)
            )
        };
        this._apiTests = (model.apiTests ?? []).map((dto) => new ApiTestEntity(dto));
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

    get isFolder(): number {
        return this._isFolder;
    }

    set isFolder(value: number) {
        this._isFolder = value;
    }

    get apiTests(): ApiTestEntity[] {
        return this._apiTests;
    }

    set apiTests(value: ApiTestEntity[]) {
        this._apiTests = value;
    }

    get apiTestData(): DataTableType<ApiTestDataEntity> {
        return this._apiTestData;
    }

    set apiTestData(value: DataTableType<ApiTestDataEntity>) {
        this._apiTestData = value;
    }
}
