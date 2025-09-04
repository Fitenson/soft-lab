import { passwordMaxError, usernameMaxError, fullNameMaxError, emailMaxError } from '@/pages/user/presentation/error/form-message';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';


export const registerSchema = z.object({
    fullName: z.string().max(100, { error: fullNameMaxError}),
    username: z.string().max(100, { error: usernameMaxError}),
    email: z.string().max(50, { error: emailMaxError}),
    password: z.string().max(50, passwordMaxError)
});


export type RegisterModel = z.infer<typeof registerSchema>;

const useRegisterForm = () => {    
    const form = useForm<RegisterModel>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: '',
            email: '',
            username: '',
            password: '',
        }
    });


    const setFormError = (error: unknown) => {
        const axiosError = error as AxiosError<{ errors?: Record<string, string[]>}>;
        const errors = axiosError?.response?.data?.errors ?? {};

        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((field) => {
                // Remove "user." prefix if it exists
                const normalizedField = field.replace(/^user\./, "") as keyof RegisterModel;
                
                if (normalizedField in form.getValues()) {
                    form.setError(normalizedField, {
                        type: "server",
                        message: errors[field][0] ?? "Invalid value",
                    });
                }
            });
        }
    }


    const registerFormField = {
        fullName: "fullName",
        username: "username",
        email: "email",
        password: "password",
    } as const;
    

    return {
        form,
        setFormError,
        registerFormField
    }
}


export default useRegisterForm;
