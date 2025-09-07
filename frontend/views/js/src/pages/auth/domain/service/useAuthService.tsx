import useAuthRepository from "@/pages/auth/data/repository/useAuthRepository";
import type Auth from "../entity/Auth";
import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";


const useAuthService = () => {
    const { login: loginRepo, register: registerRepo } = useAuthRepository();


    const login = async (auth: Auth, callbacks?: ServiceCallback<unknown>) => {
        return handleServiceCall(() => loginRepo(auth), callbacks);
    }


    const register = async (auth: Auth, callbacks: ServiceCallback<unknown>) => {
        return handleServiceCall(() => registerRepo(auth), callbacks);
    }


    return {
        login,
        register
    };
}


export default useAuthService;
