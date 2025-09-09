import { useRequest } from "@/lib/useRequest";
import type User from "@/pages/user/domain/entity/User";
import type {UserModel} from "@/pages/user/data/models/UserModel.ts";


const useUserRepository = () => {
    const { request } = useRequest();

    const index = async () => {}

    const create = async (user: User) => {
        const formData = new FormData();

        formData.append("user[username]", user.getUsername());
        formData.append("user[fullName]", user.getFullName());
        formData.append("user[email]", user.getEmail());
        formData.append("user[title]", user.getTitle());
        formData.append("user[profileImage]", user.getProfileImage());
        formData.append("user[description]", user.getDescription());
        formData.append("user[address]", user.getAddress());
        formData.append("user[gender]", user.getGender());
        formData.append("user[phoneNo]", user.getPhoneNo());
        formData.append("user[valid]", user.getValid() ? "1" : "0");

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