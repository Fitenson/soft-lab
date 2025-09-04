import { passwordMaxError, usernameMaxError } from '@/pages/user/presentation/error/form-message';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';


export const loginSchema = z.object({
    username: z.string().max(100, { error: usernameMaxError}),
    password: z.string().max(50, passwordMaxError)
});


export type LoginModel = z.infer<typeof loginSchema>;

const useLoginForm = () => {    
    const form = useForm<LoginModel>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });


    const setFormError = (error: unknown) => {
        const axiosError = error as AxiosError<{ errors?: Record<string, string[]>}>;
        const errors = axiosError?.response?.data?.errors ?? {};

        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((field) => {
                // Remove "user." prefix if it exists
                const normalizedField = field.replace(/^user\./, "") as keyof LoginModel;
                
                if (normalizedField in form.getValues()) {
                    form.setError(normalizedField, {
                        type: "server",
                        message: errors[field][0] ?? "Invalid value",
                    });
                }
            });
        }
    }


    const loginFormField = {
        username: "username",
        password: "password"
    } as const;
    

    return {
        form,
        setFormError,
        loginFormField
    }
}


export default useLoginForm;
