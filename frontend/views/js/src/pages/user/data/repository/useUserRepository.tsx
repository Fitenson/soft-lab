import { useRequest } from "@/lib/useRequest";
import UserEntity from "@/pages/user/domain/entity/UserEntity";
import type {UserDTO} from "@/pages/user/data/dto/UserDTO.ts";
import type { DataTableType, Params } from "@/types";


const useUserRepository = () => {
    const { request } = useRequest();

    const index = async (params: Params) => {
        const formData = new FormData();

        formData.append("param[offset]", params.offset ?? "0");
        formData.append("param[limit]", params.limit ?? "20");
        formData.append("param[sort]", params.sort);
        formData.append("param[order]", params.order);


        return await request<DataTableType<UserDTO>>({
            url: "/user/index",
            method: "POST",
            data: formData
        });
    }


    const create = async (userEntity: UserEntity) => {
        const userDto = userEntity.asDto();
        const formData = new FormData();

        formData.append("user[username]", userDto.username ?? "");
        formData.append("user[fullName]", userDto.fullName ?? "");
        formData.append("user[email]", userDto.email ?? "");
        formData.append("user[title]", userDto.title ?? "");
        // formData.append("user[profileImage]", userModel.profileImage);
        formData.append("user[description]", userDto.description ?? "");
        formData.append("user[address]", userDto.address ?? "");
        formData.append("user[gender]", userDto.gender ?? "");
        formData.append("user[phoneNo]", userDto.phoneNo ?? "");
        formData.append("user[valid]", userDto.valid ? "1" : "0");

        const newUserDto = await request<UserDTO>({
            url: "/user/create",
            method: "POST",
            data: formData,
        });

        return new UserEntity(newUserDto);
    }


    const update = async (userEntity: UserEntity) => {
        const userDto = userEntity.asDto();
        const formData = new FormData();

        formData.append("user[username]", userDto.username ?? "");
        formData.append("user[fullName]", userDto.fullName ?? "");
        formData.append("user[email]", userDto.email ?? "");
        formData.append("user[title]", userDto.title ?? "");
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


    return {
        index,
        create,
        update,
    };
}


export default useUserRepository;
