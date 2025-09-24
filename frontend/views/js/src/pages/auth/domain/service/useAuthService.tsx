import useAuthRepository from "@/pages/auth/data/repository/useAuthRepository";
import { handleServiceCall, type ServiceCallback } from "@/core/domain/service/serviceHandler";
import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";
import AuthEntity from "@/pages/auth/domain/entity/AuthEntity";
import { useCallback } from "react";


const useAuthService = () => {
    const { login: loginRepo, register: registerRepo } = useAuthRepository();

    const login = useCallback(async (authDTO: Partial<AuthDTO>, callbacks?: ServiceCallback<AuthDTO>) => {
        const authEntity = new AuthEntity(authDTO);
        const newAuthDTO: Partial<AuthDTO> = await handleServiceCall<AuthDTO>(()  => loginRepo(authEntity), callbacks);
        const newAuthEntity: AuthEntity = new AuthEntity(newAuthDTO);

        return newAuthEntity.asDto();
    }, [loginRepo])


    const register = useCallback(async (authDTO: Partial<AuthDTO>, callbacks: ServiceCallback<AuthDTO>) => {
        const authEntity = new AuthEntity(authDTO);
        const newAuthDTO: Partial<AuthDTO> = await handleServiceCall<AuthDTO>(() => registerRepo(authEntity), callbacks);;
        const newAuthEntity: AuthEntity = new AuthEntity(newAuthDTO);
        
        return newAuthEntity.asDto();
    }, [registerRepo]);


    return {
        login,
        register,
    };
}


export default useAuthService;
