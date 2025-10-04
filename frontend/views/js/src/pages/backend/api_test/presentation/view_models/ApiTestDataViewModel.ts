import type { ApiTestDataDTO } from "@/pages/backend/api_test/data/dto/ApiTestDataDTO.ts";


export default class ApiTestDataViewModel {
    private _UUID: string;
    private _apiTest: string;
    private _key: string;
    private _value: string;
    private _description: string;
    private _enabled: number;
    private _fieldType: string;


    constructor(dto: Partial<ApiTestDataDTO>) {
        this._UUID = dto.UUID ?? "";
        this._apiTest = dto.apiTest ?? "";
        this._key = dto.key ?? "";
        this._value = dto.value ?? "";
        this._description = dto.description ?? "";
        this._enabled = dto.enabled ?? 1;
        this._fieldType = dto.fieldType ?? "";
    }


    get UUID(): string {
        return this._UUID;
    }

    get apiTest(): string {
        return this._apiTest;
    }

    get key(): string {
        return this._key;
    }

    get value(): string {
        return this._value;
    }

    get description(): string {
        return this._description;
    }

    get enabled(): number {
        return this._enabled;
    }

    get fieldType(): string {
        return this._fieldType;
    }
}
