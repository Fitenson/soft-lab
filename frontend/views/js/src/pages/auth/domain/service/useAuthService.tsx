import useAuthRepository from "@/pages/auth/data/repository/useAuthRepository";
import type Auth from "../entity/Auth";
import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import type { AuthModel } from "@/pages/auth/data/model/AuthModel";


const useAuthService = () => {
    const { login: loginRepo, register: registerRepo } = useAuthRepository();


    const login = async (auth: Auth, callbacks?: ServiceCallback<AuthModel>) => {
        return handleServiceCall<AuthModel>(() => loginRepo(auth), callbacks);
    }


    const register = async (auth: Auth, callbacks: ServiceCallback<AuthModel>) => {
        return handleServiceCall<AuthModel>(() => registerRepo(auth), callbacks);
    }


    return {
        login,
        register
    };
}


export default useAuthService;
