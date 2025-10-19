import { useRequest } from "@/lib/useRequest";
import type { DataTableType, Params } from "@/types";
import { clientDatabaseFormData, type ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO";
import ClientDatabaseEntity from "@/pages/backend/client_database/domain/entity/ClientDatabaseEntity";
import type {ClientDatabaseTableDTO} from "@/pages/backend/client_database/data/dto/ClientDatabaseTableDTO.ts";


const useClientDatabaseRepository = () => {
    const { request } = useRequest();


    const indexClientDatabase = async () => {
        return await request<DataTableType<ClientDatabaseDTO>>({
            url: "client-database/index",
            method: "GET",
        });
    }


    const createClientDatabase = async (clientDatabaseEntity: ClientDatabaseEntity) => {
        const clientDatabaseDTO: Partial<ClientDatabaseDTO> = clientDatabaseEntity.asDto();
        const formData = clientDatabaseFormData(clientDatabaseDTO, new FormData());

        const response = await request<{ clientDatabase: ClientDatabaseDTO }>({
            url: "/client-database/create",
            method: "POST",
            data: formData
        });

        const newClientDatabase = response.clientDatabase;
        return new ClientDatabaseEntity(newClientDatabase);
    }


    const updateClientDatabase = async (clientDatabaseEntity: ClientDatabaseEntity) => {
        const clientDatabaseDTO: Partial<ClientDatabaseDTO> = clientDatabaseEntity.asDto();
        const formData = clientDatabaseFormData(clientDatabaseDTO, new FormData());

        const response = await request<{ clientDatabase: ClientDatabaseDTO }>({
            url: `/client-database/update?id=${clientDatabaseDTO.UUID}`,
            method: "POST",
            data: formData
        });

        const newClientDatabase = response.clientDatabase;
        return new ClientDatabaseEntity(newClientDatabase);
    }


    const removeClientDatabase = async (UUIDs: string[]) => {
        const formData = new FormData();

        UUIDs.forEach((UUID) => {
            formData.append("UUIDs[]", UUID);
        });

        return await request<{ success: ClientDatabaseDTO[], failed: ClientDatabaseDTO[] }>({
            url: "/client-database/remove",
            method: "POST",
            data: formData,
        });
    }


    const connectClientDatabase = async (id: string) => {
        return await request<ClientDatabaseDTO>({
            url: `/client-database/connect?id=${id}`,
            method: "GET",
        });
    }


    const getTableList = async ({ params, clientDatabaseToken }: { params: Params, clientDatabaseToken: string }) => {
        const formData = new FormData();

        formData.append("param[offset]", params.offset);
        formData.append("param[limit]", params.limit);
        formData.append("param[sort]", params.sort);
        formData.append("param[order]", params.order);

        return await request<DataTableType<ClientDatabaseTableDTO>>({
            url: `/client-database/get-table-list`,
            method: "POST",
            data: formData,
            headers: {
                "X-Client-Database-Token": clientDatabaseToken
            }
        });
    }


    return {
        indexClientDatabase,
        createClientDatabase,
        updateClientDatabase,
        removeClientDatabase,
        connectClientDatabase,
        getTableList,
    };
}


export default useClientDatabaseRepository;
