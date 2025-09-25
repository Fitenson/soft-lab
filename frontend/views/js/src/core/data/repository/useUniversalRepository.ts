import { useRequest } from "@/lib/useRequest";
import type { DataTableType, Params } from "@/types";


const useUniversalRepository = () => {
    const { request } = useRequest();

    async function dropdownTable<TDTO>(
        params: Params,
        tables: string[]
    ): Promise<Record<string, DataTableType<TDTO>>> {
        const formData = new FormData();

        formData.append("param[offset]", params.offset);
        formData.append("param[limit]", params.limit);
        formData.append("param[sort]", params.sort);
        formData.append("param[order]", params.order);

        if (params.filter !== "{}") {
            formData.append("param[filter]", params.filter);
        }

        tables.forEach((table) => {
            formData.append("table[]", table);
        });

        return request<Record<string, DataTableType<TDTO>>>({
            url: "/universal/dropdown-table",
            method: "POST",
            data: formData,
        });
    }

    return { dropdownTable };
};

export default useUniversalRepository;
