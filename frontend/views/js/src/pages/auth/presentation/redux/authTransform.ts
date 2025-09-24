import { createTransform } from "redux-persist";
import AuthViewModel from "@/pages/auth/presentation/view_models/AuthViewModel";
import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";

// type AuthState = AuthViewModel | null;

const authTransform = createTransform<AuthViewModel | null, AuthDTO | null>(
    // inbound: Redux state → Storage
    (inboundState) => {
        console.log('In Bound', inboundState);
        return inboundState ? inboundState.asJson() : null;
    },

    // outbound: Storage → Redux state
    (outboundState) => {
        console.log('Out Bound', outboundState);
        return outboundState ? new AuthViewModel(outboundState) : null;
    },
    { whitelist: ["auth"] }
);


export default authTransform;
