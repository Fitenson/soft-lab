import { useForm } from "react-hook-form";
import { userSchema, type UserForm } from "../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type {UserViewModel} from "@/pages/user/presentation/view_models/UserViewModel.ts";


const useUserForm = ({ userViewModel }: { userViewModel: UserViewModel }) => {
    const form = useForm<UserForm>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: userViewModel?.username,
            fullName: userViewModel?.fullName,
            email: userViewModel?.email,
            address: userViewModel?.address,
            description: userViewModel?.description,

        }
    });


    return {
        form,
    }
}


export default useUserForm;
