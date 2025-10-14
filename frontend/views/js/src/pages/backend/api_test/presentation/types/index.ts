export type NodeType = "folder" | "file";
export type MenuActionType = "create" | "rename" | "remove" | "cancel" | null;
export type DataFieldTypeValue = string | { table: string };

export class DataFieldType {
    private field: Record<string, DataFieldTypeValue> = {};
    private table = new Set<string>();
    private type: "text" | "file" | "dropdown" | null = null;

    setField(field: "text" | "file" | "dropdown"): void {
        this.type = field;

        switch (field) {
            case "text":
                this.field = { text: "string" };
                break;

            case "file":
                this.field = { file: "base64" };
                break;

            case "dropdown":
                this.field = {};
                break;

            default:
                throw new Error("Unknown field type " + field);
        }
    }

    setDropdown(tableName: string): void {
        if (this.type !== "dropdown") {
            throw new Error(
                "setDropdown() can only be used after setField('dropdown')"
            );
        }

        if (this.table.has(tableName)) {
            throw new Error(`Duplicate table name: ${tableName}`);
        }

        this.table.add(tableName);
        this.field = { dropdown: { table: tableName } };
    }

    asJSONString(): string {
        return JSON.stringify(this.field, null, 2);
    }

    asJson() {
        return this.field;
    }

    getField() {
        return this.field;
    }
}
