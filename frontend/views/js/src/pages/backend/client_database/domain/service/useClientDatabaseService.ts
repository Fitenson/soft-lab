import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import useClientDatabaseRepository from "@/pages/backend/client_database/data/repository/useClientDatabaseRepository";
import type { DataTableType } from "@/types";
import ClientDatabaseViewModel from "@/pages/backend/client_database/view_models/ClientDatabaseViewModel";
import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO";
import ClientDatabaseEntity from "@/pages/backend/client_database/domain/entity/ClientDatabaseEntity";


const useClientDatabaseService = () => {
    const { 
        indexClientDatabase: indexClientDatabaseRepo, 
        createClientDatabase: createClientDatabaseRepo,
        updateClientDatabase: updateClientDatabaseRepo,
        removeClientDatabase: removeClientDatabaseRepo,
    } = useClientDatabaseRepository();


    const indexClientDatabase = async (callbacks?: ServiceCallback<DataTableType<ClientDatabaseViewModel>>) => {
        return handleServiceCall<DataTableType<ClientDatabaseViewModel>>(async () => {
            const response = await indexClientDatabaseRepo();
            const rows = response.rows.map(dto => new ClientDatabaseViewModel(dto));

            return {
                ...response,
                rows
            };
        }, callbacks);
    }


    const createClientDatabase = async (
        clientDatabaseDTO: Partial<ClientDatabaseDTO>,
        callbacks?: ServiceCallback<ClientDatabaseEntity>
    ) => {
        let clientDatabaseEntity = new ClientDatabaseEntity(clientDatabaseDTO);
        clientDatabaseEntity = await handleServiceCall<ClientDatabaseEntity>(async () => createClientDatabaseRepo(clientDatabaseEntity), callbacks);
        return clientDatabaseEntity.asViewModel();
    }


    const updateClientDatabase = async (
        clientDatabaseDTO: Partial<ClientDatabaseDTO>,
        callbacks?: ServiceCallback<ClientDatabaseEntity>
    ) => {
        let clientDatabaseEntity = new ClientDatabaseEntity(clientDatabaseDTO);
        clientDatabaseEntity = await handleServiceCall<ClientDatabaseEntity>(async () => updateClientDatabaseRepo(clientDatabaseEntity), callbacks);
        return clientDatabaseEntity.asViewModel();
    }


    const removeClientDatabase = async (
        UUIDs: string[],
        callbacks?: ServiceCallback<{ success: ClientDatabaseDTO[], failed: ClientDatabaseDTO[] }>
    ) => {
        return await handleServiceCall<{ success: ClientDatabaseDTO[], failed: ClientDatabaseDTO[] }>(async () => removeClientDatabaseRepo(UUIDs), callbacks);
    }


    return {
        indexClientDatabase,
        createClientDatabase,
        updateClientDatabase,
        removeClientDatabase
    }
}


export default useClientDatabaseService;
