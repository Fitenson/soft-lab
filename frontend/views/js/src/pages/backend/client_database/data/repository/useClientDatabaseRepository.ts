import { useRequest } from "@/lib/useRequest";
import type { DataTableType } from "@/types";
import { clientDatabaseFormData, type ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO";
import ClientDatabaseEntity from "@/pages/backend/client_database/domain/entity/ClientDatabaseEntity";


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
            url: "/user/remove",
            method: "POST",
            data: formData,
        });
    }


    return {
        indexClientDatabase,
        createClientDatabase,
        updateClientDatabase,
        removeClientDatabase
    };
}


export default useClientDatabaseRepository;
