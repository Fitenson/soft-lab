import { useRequest } from "@/lib/useRequest"
import type Auth from "../../domain/entity/Auth";


const useAuthRepository = () => {
    const { request } = useRequest();

    const login = async (auth: Auth) => {
        const formData = new FormData();

        formData.append("username", auth.getUsername());
        formData.append("password", auth.getPassword());

        return await request({
            url: "/auth/login",
            method: "POST",
            data: formData
        });
    }


    const register = async (auth: Auth) => {
        const formData = new FormData();

        formData.append("username", auth.getUsername());
        formData.append("password", auth.getPassword());

        return await request({
            url: "/auth/login",
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
