import type { CellContext } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export function createBooleanCheckboxCell<TData>(
    onToggle: (args: { row: TData; next: boolean }) => void,
    options?: {
        disabled?: (row: TData) => boolean;
        ariaLabel?: (row: TData) => string;
    }
) {
    return ({ getValue, row }: CellContext<TData, unknown>) => {
        const value = Boolean(getValue());
        const original = row.original as TData;
        const disabled = options?.disabled?.(original) ?? false;
        const aria = options?.ariaLabel?.(original) ?? "Toggle";

        return (
            <div
                className="flex items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <Checkbox
                    checked={value}
                    disabled={disabled}
                    aria-label={aria}
                    onCheckedChange={(v) => onToggle({ row: original, next: !!v })}
                    className="translate-y-[1px]"
                />
            </div>
        );
    };
}