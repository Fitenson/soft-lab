import useAuthRepository from "@/pages/auth/data/repository/useAuthRepository";
import type Auth from "../entity/AuthEntity";
import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";


const useAuthService = () => {
    const { login: loginRepo, register: registerRepo } = useAuthRepository();


    const login = async (auth: Auth, callbacks?: ServiceCallback<AuthDTO>) => {
        return handleServiceCall<AuthDTO>(() => loginRepo(auth), callbacks);
    }


    const register = async (auth: Auth, callbacks: ServiceCallback<AuthDTO>) => {
        return handleServiceCall<AuthDTO>(() => registerRepo(auth), callbacks);
    }


    return {
        login,
        register
    };
}


export default useAuthService;
