import type { ApiTestDataDTO } from "@/pages/backend/api_test/data/dto/ApiTestDataDTO.ts";


export default class ApiTestDataViewModel {
    private _UUID: string;
    private _apiTest: string;
    private _key: string;
    private _value: string;
    private _description: string;
    private _enabled: number;
    private _fieldType: string;
    private _isNew: number;


    constructor(dto: Partial<ApiTestDataDTO>) {
        this._UUID = dto.UUID ?? "";
        this._apiTest = dto.apiTest ?? "";
        this._key = dto.key ?? "";
        this._value = dto.value ?? "";
        this._description = dto.description ?? "";
        this._enabled = dto.enabled ?? 1;
        this._fieldType = this.decodeFieldType(dto.fieldType ?? "");
        this._isNew = dto.isNew ?? 0;
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

    get isNew(): number {
        return this._isNew;
    }

    get dto(): Partial<ApiTestDataDTO> {
        return {
            UUID: this._UUID,
            apiTest: this._apiTest,
            key: this._key,
            value: this._value,
            description: this._description,
            enabled: this._enabled,
            fieldType: this.encodeFieldType(this._fieldType),
            isNew: this._isNew,
        };
    }

    private decodeFieldType(encoded: string): string {
        try {
            const decoded = atob(encoded);
            // verify it’s JSON, not plain string
            JSON.parse(decoded);
            return decoded;
        } catch {
            // fallback if it’s already JSON or invalid
            return encoded;
        }
    }

    private encodeFieldType(jsonString: string): string {
        return btoa(jsonString);
    }
}
