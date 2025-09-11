import { useRequest } from "@/lib/useRequest"
import type AuthEntity from "@/pages/auth/domain/entity/AuthEntity";
import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";


const useAuthRepository = () => {
    const { request } = useRequest();

    const login = async (authEntity: AuthEntity): Promise<AuthDTO> => {
        const authDTO = authEntity.asDto();
        const formData = new FormData();

        formData.append("username", authDTO.username ?? "");
        formData.append("password", authDTO.password ?? "");

        return await request<AuthDTO>({
            url: "/auth/login",
            method: "POST",
            data: formData
        });
    }


    const register = async (authEntity: AuthEntity) => {
        const authDTO = authEntity.asDto();
        const formData = new FormData();

        formData.append("fullName", authDTO.fullName ?? "");
        formData.append("username", authDTO.username ?? "");
        formData.append("email", authDTO.email ?? "");
        formData.append("password", authDTO.password ?? "");

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
