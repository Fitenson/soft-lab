import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import useClientDatabaseRepository from "@/pages/backend/client_database/data/repository/useClientDatabaseRepository";
import type {DataTableType, Params} from "@/types";
import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel";
import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO";
import ClientDatabaseEntity from "@/pages/backend/client_database/domain/entity/ClientDatabaseEntity";
import ClientDatabaseTableViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseTableViewModel.ts";


const useClientDatabaseService = () => {
    const { 
        indexClientDatabase: indexClientDatabaseRepo, 
        createClientDatabase: createClientDatabaseRepo,
        updateClientDatabase: updateClientDatabaseRepo,
        removeClientDatabase: removeClientDatabaseRepo,
        connectClientDatabase: connectClientDatabaseRepo,
        getTableList: getTableListRepo,
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
        callbacks?: ServiceCallback<ClientDatabaseViewModel>
    ) => {
        let clientDatabaseEntity = new ClientDatabaseEntity(clientDatabaseDTO);

        clientDatabaseEntity = await handleServiceCall<ClientDatabaseEntity>(
            async () => createClientDatabaseRepo(clientDatabaseEntity),
            {
                ...callbacks,
                onSuccess: (entity) => {
                    const viewModel = entity.asViewModel();
                    callbacks?.onSuccess?.(viewModel);
                }
            }
        );

        return clientDatabaseEntity.asViewModel();
    }


    const updateClientDatabase = async (
        clientDatabaseDTO: Partial<ClientDatabaseDTO>,
        callbacks?: ServiceCallback<ClientDatabaseViewModel>
    ) => {
        let clientDatabaseEntity = new ClientDatabaseEntity(clientDatabaseDTO);

        clientDatabaseEntity = await handleServiceCall<ClientDatabaseEntity>(
            async () => updateClientDatabaseRepo(clientDatabaseEntity),
            {
                ...callbacks,
                onSuccess: (entity) => {
                    const viewModel = entity.asViewModel();
                    callbacks?.onSuccess?.(viewModel);
                }
            }
        );

        return clientDatabaseEntity.asViewModel();
    }



    const removeClientDatabase = async (
        UUIDs: string[],
        callbacks?: ServiceCallback<{ success: ClientDatabaseDTO[], failed: ClientDatabaseDTO[] }>
    ) => {
        return await handleServiceCall<{ success: ClientDatabaseDTO[], failed: ClientDatabaseDTO[] }>(async () => removeClientDatabaseRepo(UUIDs), callbacks);
    }


    const connectClientDatabase = async (
        id: string,
        callbacks?: ServiceCallback<ClientDatabaseViewModel>
    ) => {
        const clientDatabaseDTO = await handleServiceCall<ClientDatabaseDTO>(
            async () => connectClientDatabaseRepo(id),
            {
                ...callbacks,
                onSuccess: (dto) => {
                    const viewModel = new ClientDatabaseViewModel(dto);
                    callbacks?.onSuccess?.(viewModel);
                }
            }
        );

        return new ClientDatabaseViewModel(clientDatabaseDTO);
    }


    const getTableList = async (
        { params, clientDatabaseToken }: { params: Params, clientDatabaseToken: string },
        { callbacks }: { callbacks?: ServiceCallback<DataTableType<ClientDatabaseTableViewModel>> }
    ) => {
        return handleServiceCall<DataTableType<ClientDatabaseTableViewModel>>(async () => {
            const response = await getTableListRepo({ params: params, clientDatabaseToken: clientDatabaseToken });
            const rows = response.rows.map((dto) => new ClientDatabaseTableViewModel(dto));

            return {
                ...response,
                rows,
            };
        }, callbacks);
    };


    return {
        indexClientDatabase,
        createClientDatabase,
        updateClientDatabase,
        removeClientDatabase,
        connectClientDatabase,
        getTableList,
    }
}


export default useClientDatabaseService;
