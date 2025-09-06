import useAuthRepository from "@/pages/auth/data/repository/useAuthRepository";
import type Auth from "../entity/Auth";


const useAuthService = () => {
    const { login: loginRepo, register: registerRepo } = useAuthRepository();


    const login = async (auth: Auth) => {
        return await loginRepo(auth);
    }


    const register = async (auth: Auth) => {
        return await registerRepo(auth);
    }


    return {
        login,
        register
    };
}


export default useAuthService;
