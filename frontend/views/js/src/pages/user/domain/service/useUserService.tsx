import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import useUserRepository from "@/pages/user/data/repository/useUserRepository";
import type { DataTableType, Params } from "@/types";
import type UserEntity from "../entity/UserEntity";
import UserViewModel from "@/pages/user/presentation/view_models/UserViewModel.ts";


const useUserService = () => {
    const { index: indexRepo, create: createRepo, update: updateRepo } = useUserRepository();

    const index = async (
        params: Params, 
        callbacks?: ServiceCallback<DataTableType<UserViewModel>>
    ) => {
        return handleServiceCall<DataTableType<UserViewModel>>(async () => {
            const response = await indexRepo(params);
            const rows = response.rows.map(dto => new UserViewModel(dto));

            return {
                ...response,
                rows
            };
        }, callbacks);
    };


    const create = async (
        user: UserEntity,
        callbacks?: ServiceCallback<UserEntity>
    ) => {
        const userEntity = await handleServiceCall<UserEntity>(async () => createRepo(user), callbacks);
        return userEntity.asViewModel();
    };


    const update = async (
        user: UserEntity,
        callbacks?: ServiceCallback<UserEntity>
    ) => {
        const userEntity = await handleServiceCall<UserEntity>(async () => updateRepo(user), callbacks);
        return userEntity.asViewModel();
    };


    return {
        index,
        create,
        update,
    };
};


export default useUserService;
