import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";
import { useMemo } from "react";


const useAuthState = () => {
    const authDTO = useAppSelector(state => state.auth.auth);
    const authViewModel = useMemo(() => authDTO ? new AuthViewModel(authDTO) : null, [authDTO]);
    

    return {
        authDTO,
        authViewModel
    };
}


export default useAuthState;
