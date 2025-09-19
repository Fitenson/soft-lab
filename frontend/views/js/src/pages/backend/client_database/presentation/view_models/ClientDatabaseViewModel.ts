import type {ClientDatabaseDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";

export default class ClientDatabaseViewModel {
    private readonly _UUID: string;
    private readonly _databaseName: string;
    private readonly _databaseSchema: string;
    private readonly _refreshToken: string;
    private readonly _host: string;
    private readonly _port: string;
    private readonly _username: string;
    private readonly _password: string;
    private readonly _valid: boolean;


    constructor(data: Partial<ClientDatabaseDTO>) {
        this._UUID = data.UUID ?? "";
        this._databaseName = data.databaseName ?? "";
        this._databaseSchema = data.databaseSchema ?? "";
        this._refreshToken = data.refreshToken ?? "";
        this._host = data.host ?? "";
        this._port = data.port ?? "";
        this._username = data.username ?? "";
        this._password = data.password ?? "";
        this._valid = data.valid ?? true;
    }


    get UUID(): string {
        return this._UUID;
    }

    get databaseName(): string {
        return this._databaseName;
    }

    get databaseSchema(): string {
        return this._databaseSchema;
    }

    get refreshToken(): string {
        return this._refreshToken;
    }

    get host(): string {
        return this._host;
    }

    get port(): string {
        return this._port;
    }

    get username(): string {
        return this._username;
    }

    get password(): string {
        return this._password;
    }

    get valid(): boolean {
        return this._valid;
    }
}
