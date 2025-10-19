export interface ClientDatabaseTableDTO {
    table: string;
    columns?: TableColumnDTO[]
}


export interface TableColumnDTO {
    field: string;
    type: string;
    collation: string;
    null: string;
    key: string;
    default: string;
    extra: string;
    privileges: string;
    comment: string;
}
