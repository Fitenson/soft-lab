import BaseEntity from "@/core/domain/entity/BaseEntity.ts";
import type {
    ClientDatabaseTableDTO,
    TableColumnDTO
} from "@/pages/backend/client_database/data/dto/ClientDatabaseTableDTO.ts";


export default class ClientDatabaseTableEntity extends BaseEntity<ClientDatabaseTableDTO> {
    private _table: string;
    private _columns: TableColumnEntity[];

    constructor(dto: Partial<ClientDatabaseTableDTO>) {
        super(dto);
        this._table = dto.table ?? "";
        this._columns = dto.columns?.map((columnDTO) => new TableColumnEntity(columnDTO)) ?? [];
    }

    asViewModel(): ClientDatabaseTableDTO {
        return new ClientDatabaseTableEntity(this.asDto());
    }

    get table(): string {
        return this._table;
    }

    set table(value: string) {
        this._table = value;
    }

    get columns(): TableColumnEntity[] {
        return this._columns;
    }

    set columns(value: TableColumnEntity[]) {
        this._columns = value;
    }
}


export class TableColumnEntity extends BaseEntity<TableColumnDTO> {
    private _field: string;
    private _type: string;
    private _collation: string;
    private _null: string;
    private _key: string;
    private _default: string;
    private _extra: string;
    private _privileges: string;
    private _comment: string;

    constructor(dto: Partial<TableColumnDTO>) {
        super(dto);
        this._field = dto.field ?? "";
        this._type = dto.type ?? "";
        this._collation = dto.collation ?? "";
        this._null = dto.null ?? "";
        this._key = dto.key ?? "";
        this._default = dto.default ?? "";
        this._extra = dto.extra ?? "";
        this._privileges = dto.privileges ?? "";
        this._comment = dto.comment ?? "";
    }

    asViewModel(): TableColumnDTO {
        return new TableColumnEntity(this.asDto());
    }

    get field(): string {
        return this._field;
    }

    set field(value: string) {
        this._field = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get collation(): string {
        return this._collation;
    }

    set collation(value: string) {
        this._collation = value;
    }

    get null(): string {
        return this._null;
    }

    set null(value: string) {
        this._null = value;
    }

    get key(): string {
        return this._key;
    }

    set key(value: string) {
        this._key = value;
    }

    get default(): string {
        return this._default;
    }

    set default(value: string) {
        this._default = value;
    }

    get extra(): string {
        return this._extra;
    }

    set extra(value: string) {
        this._extra = value;
    }

    get privileges(): string {
        return this._privileges;
    }

    set privileges(value: string) {
        this._privileges = value;
    }

    get comment(): string {
        return this._comment;
    }

    set comment(value: string) {
        this._comment = value;
    }
}
