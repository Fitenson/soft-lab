import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import useUserRepository from "@/pages/user/data/repository/useUserRepository";
import type { DataTableType, Params } from "@/types";
import type User from "../entity/UserEntity";


const useUserService = () => {
    const { index: indexRepo, create: createRepo } = useUserRepository();

    const index = async (
        params: Params, 
        callbacks?: ServiceCallback<DataTableType<User>>
    ) => {
        // indexRepo returns DTOs from API
        // map them to domain entities
        return handleServiceCall<DataTableType<User>>(async () => {
            const response = await indexRepo(params); // returns DataTableType<UserModel>
            return {
                total: response.total,
                rows: response.rows.map(User.fromModel) // map DTO to entity
            };
        }, callbacks);
    };


    const create = async (
        user: User, // domain entity
        callbacks?: ServiceCallback<User>
    ) => {
        // map entity to API shape if needed
        return handleServiceCall<User>(async () => createRepo(user.toModel()), callbacks);
    };


    return {
        index,
        create
    };
};


export default useUserService;
