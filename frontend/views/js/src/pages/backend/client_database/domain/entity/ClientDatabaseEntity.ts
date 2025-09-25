import BaseEntity from "@/core/domain/entity/BaseEntity.ts";
import type {ClientDatabaseDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";
import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";

export default class ClientDatabaseEntity extends BaseEntity<ClientDatabaseDTO> {
    private _UUID: string;
    private _databaseName: string;
    private _databaseSchema: string;
    private _refreshToken: string;
    private _host: string;
    private _port: string;
    private _username: string;
    private _password: string;
    private _project: string;
    private _valid: boolean;


    constructor(data: Partial<ClientDatabaseDTO>) {
        super(data);
        this._UUID = data.UUID ?? "";
        this._databaseName = data.databaseName ?? "";
        this._databaseSchema = data.databaseSchema ?? "";
        this._refreshToken = data.refreshToken ?? "";
        this._host = data.host ?? "";
        this._port = data.port ?? "";
        this._username = data.username ?? "";
        this._password = data.password ?? "";
        this._project = data.project ?? "";
        this._valid = data.valid ?? true;
    }

    asViewModel(): ClientDatabaseViewModel {
        return new ClientDatabaseViewModel(this.asDto());
    }


    get UUID(): string {
        return this._UUID;
    }

    set UUID(value: string) {
        this._UUID = value;
    }

    get databaseName(): string {
        return this._databaseName;
    }

    set databaseName(value: string) {
        this._databaseName = value;
    }

    get databaseSchema(): string {
        return this._databaseSchema;
    }

    set databaseSchema(value: string) {
        this._databaseSchema = value;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    set refreshToken(value: string) {
        this._refreshToken = value;
    }

    get host(): string {
        return this._host;
    }

    set host(value: string) {
        this._host = value;
    }

    get port(): string {
        return this._port;
    }

    set port(value: string) {
        this._port = value;
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get project(): string {
        return this._project;
    }

    set project(value: string) {
        this._project = value;
    }

    get valid(): boolean {
        return this._valid;
    }

    set valid(value: boolean) {
        this._valid = value;
    }
}