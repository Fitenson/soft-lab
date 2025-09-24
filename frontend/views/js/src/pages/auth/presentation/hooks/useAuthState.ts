import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";


const useAuthState = () => {
    const authDTO = useAppSelector(state => state.auth.auth);
    const authViewModel = authDTO ? new AuthViewModel(authDTO) : null;

    return {
        authDTO,
        authViewModel
    };
}


export default useAuthState;
