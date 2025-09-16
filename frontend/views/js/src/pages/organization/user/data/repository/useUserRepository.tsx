import { useRequest } from "@/lib/useRequest.ts";
import UserEntity from "@/pages/organization/user/domain/entity/UserEntity.ts";
import type {UserDTO} from "@/pages/organization/user/data/dto/UserDTO.ts";
import type { DataTableType, Params } from "@/types";


const useUserRepository = () => {
    const { request } = useRequest();

    const index = async (params: Params) => {
        const formData = new FormData();

        formData.append("param[offset]", params.offset);
        formData.append("param[limit]", params.limit);
        formData.append("param[sort]", params.sort);
        formData.append("param[order]", params.order);

        if(params.filter !== "{}") {
            formData.append("param[filter]", params.filter);
        }

        return await request<DataTableType<UserDTO>>({
            url: "/user/index",
            method: "POST",
            data: formData
        });
    }


    const createUser = async (userEntity: UserEntity) => {
        const userDto = userEntity.asDto();
        const formData = new FormData();

        formData.append("user[username]", userDto.username ?? "");
        formData.append("user[fullName]", userDto.fullName ?? "");
        formData.append("user[email]", userDto.email ?? "");
        formData.append("user[title]", userDto.title ?? "");
        formData.append("user[role]", userDto.role ?? "");
        // formData.append("user[profileImage]", userModel.profileImage);
        formData.append("user[description]", userDto.description ?? "");
        formData.append("user[address]", userDto.address ?? "");
        formData.append("user[gender]", userDto.gender ?? "");
        formData.append("user[phoneNo]", userDto.phoneNo ?? "");
        formData.append("user[valid]", userDto.valid ? "1" : "0");

        const response = await request<{ user: UserDTO}>({
            url: "/user/create",
            method: "POST",
            data: formData,
        });

        const newUserDto = response.user;
        return new UserEntity(newUserDto);
    }


    const updateUser = async (userEntity: UserEntity) => {
        const userDto = userEntity.asDto();
        const formData = new FormData();

        formData.append("user[username]", userDto.username ?? "");
        formData.append("user[fullName]", userDto.fullName ?? "");
        formData.append("user[email]", userDto.email ?? "");
        formData.append("user[title]", userDto.title ?? "");
        formData.append("user[role]", userDto.role ?? "");
        // formData.append("user[profileImage]", userModel.profileImage);
        formData.append("user[description]", userDto.description ?? "");
        formData.append("user[address]", userDto.address ?? "");
        formData.append("user[gender]", userDto.gender ?? "");
        formData.append("user[phoneNo]", userDto.phoneNo ?? "");
        formData.append("user[valid]", userDto.valid ? "1" : "0");

        const newUserDto = await request<UserDTO>({
            url: `/user/update?id=${userDto.UUID}`,
            method: "POST",
            data: formData,
        });

        return new UserEntity(newUserDto);
    }


    const removeUser = async (UUIDs: string[]) => {
        const formData = new FormData();

        UUIDs.forEach((UUID) => {
            formData.append("UUIDs[]", UUID);
        });

        return await request<{ success: UserDTO[], failed: UserDTO[] }>({
            url: "/user/remove",
            method: "POST",
            data: formData,
        });
    }


    return {
        index,
        createUser,
        updateUser,
        removeUser,
    };
}


export default useUserRepository;
