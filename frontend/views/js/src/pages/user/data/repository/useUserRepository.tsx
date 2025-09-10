import { useRequest } from "@/lib/useRequest";
import type User from "@/pages/user/domain/entity/UserEntity";
import type {UserModel} from "@/pages/user/data/models/UserModel.ts";
import type { DataTableType, Params } from "@/types";


const useUserRepository = () => {
    const { request } = useRequest();

    const index = async (params: Params) => {
        const formData = new FormData();

        formData.append("param[offset]", params.offset);
        formData.append("param[limit]", params.limit);
        formData.append("param[sort]", params.sort);
        formData.append("param[order]", params.order);


        return await request<DataTableType<User>>({
            url: "/user/index",
            method: "POST",
            data: formData
        });
    }


    const create = async (user: User) => {
        const userModel = user.asModel();
        const formData = new FormData();

        formData.append("user[username]", userModel.username ?? "");
        formData.append("user[fullName]", userModel.fullName ?? "");
        formData.append("user[email]", userModel.email ?? "");
        formData.append("user[title]", userModel.title ?? "");
        // formData.append("user[profileImage]", userModel.profileImage);
        formData.append("user[description]", userModel.description ?? "");
        formData.append("user[address]", userModel.address ?? "");
        formData.append("user[gender]", userModel.gender ?? "");
        formData.append("user[phoneNo]", userModel.phoneNo ?? "");
        formData.append("user[valid]", userModel.valid ? "1" : "0");


        return await request<UserModel>({
            url: "/user/create",
            method: "POST",
            data: formData,
        });
    }


    return {
        index,
        create
    };
}


export default useUserRepository;
