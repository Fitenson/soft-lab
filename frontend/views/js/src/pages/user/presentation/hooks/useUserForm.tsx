import { useForm } from "react-hook-form";
import { userSchema, type UserForm } from "../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";


const useUserForm = () => {
    const form = useForm<UserForm>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: ""
        }
    });
}


export default useUserForm;
