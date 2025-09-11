import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import useUserRepository from "@/pages/user/data/repository/useUserRepository";
import type { DataTableType, Params } from "@/types";
import UserEntity from "../entity/UserEntity";
import UserViewModel from "@/pages/user/presentation/view_models/UserViewModel.ts";
import type { UserDTO } from "@/pages/user/data/dto/UserDTO.ts";


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
        userDTO: Partial<UserDTO>,
        callbacks?: ServiceCallback<UserEntity>
    ) => {
        let userEntity = new UserEntity(userDTO);
        userEntity = await handleServiceCall<UserEntity>(async () => createRepo(userEntity), callbacks);
        return userEntity.asViewModel();
    };


    const update = async (
        userDTO: Partial<UserDTO>,
        callbacks?: ServiceCallback<UserEntity>
    ) => {
        let userEntity = new UserEntity(userDTO);
        userEntity = await handleServiceCall<UserEntity>(async () => updateRepo(userEntity), callbacks);
        return userEntity.asViewModel();
    };


    return {
        index,
        create,
        update,
    };
};


export default useUserService;
