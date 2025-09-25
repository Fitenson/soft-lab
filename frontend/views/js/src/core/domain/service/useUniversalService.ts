import useUniversalRepository from "@/core/data/repository/useUniversalRepository";
import type { DataTableType, Params } from "@/types";
import { handleServiceCall, type ServiceCallback } from "./serviceHandler";


const useUniversalService = () => {
    const { dropdownTable: dropdownTableRepo } = useUniversalRepository();

    async function dropdownTable<
        TDTOMap extends Record<string, object>,
        TViewModelMap extends { [K in keyof TDTOMap]: new (dto: TDTOMap[K]) => object }
    >(
        params: Params,
        tables: (keyof TDTOMap)[],
        viewModels: TViewModelMap,
        callbacks?: ServiceCallback<{
            [K in keyof TViewModelMap]: DataTableType<InstanceType<TViewModelMap[K]>>;
        }>
    ) {
        return handleServiceCall<{
            [K in keyof TViewModelMap]: DataTableType<InstanceType<TViewModelMap[K]>>;
        }>(async () => {
            const response = await dropdownTableRepo<TDTOMap[keyof TDTOMap]>(
                params,
                tables as string[]
            );

            const mapped = {} as {
                [K in keyof TViewModelMap]: DataTableType<InstanceType<TViewModelMap[K]>>;
            };

            for (const table of tables) {
                type K = typeof table;
                const tableData = response[table as string] as DataTableType<TDTOMap[K]>;
                const VM = viewModels[table] as new (dto: TDTOMap[K]) => InstanceType<TViewModelMap[K]>;

                mapped[table] = {
                    ...tableData,
                    rows: tableData.rows.map((dto) => new VM(dto)),
                };
            }

            return mapped;
        }, callbacks);
    }

    return { dropdownTable };
};

export default useUniversalService;
