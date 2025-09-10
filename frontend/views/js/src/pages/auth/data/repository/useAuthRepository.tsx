import { useRequest } from "@/lib/useRequest"
import type Auth from "../../domain/entity/AuthEntity";
import type { AuthDTO } from "../dto/AuthDTO";


const useAuthRepository = () => {
    const { request } = useRequest();

    const login = async (auth: Auth): Promise<AuthDTO> => {
        const formData = new FormData();

        formData.append("username", auth.getUsername());
        formData.append("password", auth.getPassword());

        return await request<AuthDTO>({
            url: "/auth/login",
            method: "POST",
            data: formData
        });
    }


    const register = async (auth: Auth) => {
        const formData = new FormData();

        formData.append("fullName", auth.getFullName());
        formData.append("username", auth.getUsername());
        formData.append("email", auth.getEmail());
        formData.append("password", auth.getPassword());

        return await request<AuthDTO>({
            url: "/auth/register",
            method: "POST",
            data: formData
        });
    }


    return {
        login,
        register
    };
}


export default useAuthRepository;
