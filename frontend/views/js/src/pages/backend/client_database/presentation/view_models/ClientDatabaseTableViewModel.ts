import type {
    ClientDatabaseTableDTO,
    TableColumnDTO
} from "@/pages/backend/client_database/data/dto/ClientDatabaseTableDTO.ts";

export default class ClientDatabaseTableViewModel {
    private readonly _table: string;
    private readonly _columns?: TableColumnViewModel[]

    constructor(dto: ClientDatabaseTableDTO) {
        this._table = dto.table;
        this._columns = dto.columns?.map((columnDTO) => new TableColumnViewModel(columnDTO));
    }

    get table(): string {
        return this._table;
    }

    get columns(): TableColumnViewModel[] {
        return this._columns ?? [];
    }
}


export class TableColumnViewModel {
    private readonly _field: string;
    private readonly _type: string;
    private readonly _collation: string;
    private readonly _null: string;
    private readonly _key: string;
    private readonly _default: string;
    private readonly _extra: string;
    private readonly _privileges: string;
    private readonly _comment: string;
    private readonly _dto: TableColumnDTO;


    constructor(dto: TableColumnDTO) {
        this._dto = dto;
        this._field = dto.field;
        this._type = dto.type;
        this._collation = dto.collation;
        this._default = dto.default;
        this._extra = dto.extra;
        this._privileges = dto.privileges;
        this._comment = dto.comment;
        this._null = dto.null;
        this._key = dto.key;
    }


    get field(): string {
        return this._field;
    }

    get type(): string {
        return this._type;
    }

    get collation(): string {
        return this._collation;
    }

    get null(): string {
        return this._null;
    }

    get key(): string {
        return this._key;
    }

    get default(): string {
        return this._default;
    }

    get extra(): string {
        return this._extra;
    }

    get privileges(): string {
        return this._privileges;
    }

    get comment(): string {
        return this._comment;
    }

    get dto(): TableColumnDTO {
        return this._dto;
    }
}
