import BaseEntity from "@/core/domain/entity/BaseEntity.ts";
import type { ApiTestDataDTO } from "@/pages/backend/api_test/data/dto/ApiTestDataDTO.ts";
import ApiTestDataViewModel from "@/pages/backend/api_test/presentation/view_models/ApiTestDataViewModel.ts";


export default class ApiTestDataEntity extends BaseEntity<ApiTestDataDTO>{
    private _UUID: string;
    private _apiTest: string;
    private _key: string;
    private _value: string;
    private _description: string;
    private _enabled: number;
    private _fieldType: string;
    private _isNew: boolean;
    private _apiTestDataDTO: Partial<ApiTestDataDTO>;


    constructor(model: Partial<ApiTestDataDTO>) {
        super(model);
        this._UUID = model.UUID ?? "";
        this._apiTest = model.apiTest ?? "";
        this._key = model.key ?? "";
        this._value = model.value ?? "";
        this._description = model.description ?? "";
        this._enabled = model.enabled ?? 1;
        this._fieldType = btoa(model.fieldType ?? "");
        this._apiTestDataDTO = model;
        this._isNew = model.isNew ?? false;
    }

    public asViewModel(): ApiTestDataDTO {
        return new ApiTestDataViewModel(this.asDto());
    }


    get UUID(): string {
        return this._UUID;
    }

    set UUID(value: string) {
        this._UUID = value;
    }

    get apiTest(): string {
        return this._apiTest;
    }

    set apiTest(value: string) {
        this._apiTest = value;
    }

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get enabled(): number {
        return this._enabled;
    }

    set enabled(value: number) {
        this._enabled = value;
    }

    get fieldType(): string {
        return atob(this._fieldType);
    }

    set fieldType(value: string) {
        this._fieldType = btoa(value);
    }

    get apiTestDataDTO(): Partial<ApiTestDataDTO> {
        return this._apiTestDataDTO;
    }

    set apiTestDataDTO(value: Partial<ApiTestDataDTO>) {
        this._apiTestDataDTO = value;
    }

    get isNew(): boolean {
        return this._isNew;
    }

    set isNew(value: boolean) {
        this._isNew = value;
    }
}
