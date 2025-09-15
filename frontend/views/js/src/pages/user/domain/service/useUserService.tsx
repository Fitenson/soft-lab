import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import useUserRepository from "@/pages/user/data/repository/useUserRepository";
import type { DataTableType, Params } from "@/types";
import UserEntity from "../entity/UserEntity";
import UserViewModel from "@/pages/user/presentation/view-models/UserViewModel";
import type { UserDTO } from "@/pages/user/data/dto/UserDTO.ts";


const useUserService = () => {
    const { index: indexRepo, createUser: createUserRepo, updateUser: updateUserRepo, removeUser: removeUserRepo } = useUserRepository();


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


    const createUser = async (
        userDTO: Partial<UserDTO>,
        callbacks?: ServiceCallback<UserEntity>
    ) => {
        let userEntity = new UserEntity(userDTO);
        userEntity = await handleServiceCall<UserEntity>(async () => createUserRepo(userEntity), callbacks);
        return userEntity.asViewModel();
    };


    const updateUser = async (
        userDTO: Partial<UserDTO>,
        callbacks?: ServiceCallback<UserEntity>
    ) => {
        let userEntity = new UserEntity(userDTO);
        userEntity = await handleServiceCall<UserEntity>(async () => updateUserRepo(userEntity), callbacks);
        return userEntity.asViewModel();
    };


    const removeUser = async (
        UUIDs: string[],
        callbacks?: ServiceCallback<{ success: UserDTO[], failed: UserDTO[] }>
    ) => {
        return await handleServiceCall<{ success: UserDTO[], failed: UserDTO[] }>(async () => removeUserRepo(UUIDs), callbacks);
    }


    return {
        index,
        createUser,
        updateUser,
        removeUser,
    };
};


export default useUserService;
