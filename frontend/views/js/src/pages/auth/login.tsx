import { motion } from "framer-motion";
import AuthLayout from "./presentation/layouts/auth-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useLoginForm from "./presentation/hooks/useLoginForm";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import useShowToast from "@/hooks/use-show-toast";
import Auth from "./domain/entity/AuthEntity";
import useAuthService from "./domain/service/useAuthService";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import { LoadingButton } from "@/components/buttons/loading-button";
import { router } from "@inertiajs/react";
import { useDispatch } from "react-redux";
import { setAuth } from "./presentation/redux/authSlice";
import LoginFormField from "@/pages/auth/presentation/form/LoginFormField";
import type { AuthDTO } from "@/pages/auth/data/dto/AuthDTO";


export default function LoginPage() {
    const showToast = useShowToast();
    const dispatch = useDispatch();
    const isLoading = useAppSelector(state => state.loading.global);
    const { form, setFormError } = useLoginForm();
    const { login } = useAuthService();


    const submit = async () => {
        const formValues = form.getValues();
        const auth = new Auth(formValues);

        await login(auth, {
            onSuccess: (authDTO: AuthDTO) => {
                dispatch(setAuth(authDTO));
                showToast("Success", "Login successfully", "success");
                router.visit('/dashboard');
            },
            onError: (error) => {
                console.log('Error: ', error);
                setFormError(error, {
                    setToastError(message) {
                        showToast("Failed", message, "error");
                    },
                });
            }
        });
    }


    return (
        <AuthLayout>
            <section className="flex w-full items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
                >
                    <Card className="rounded-2xl shadow-md h-auto">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center">
                                Soft Lab
                            </CardTitle>
                            <CardDescription className="text-center text-xl my-2 mb-2">
                                Welcome Back
                            </CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(submit)}
                                className="flex flex-col h-full"
                            >
                                <CardContent className="flex-1 space-y-6 mx-4">
                                    {/* Username */}
                                    <FormField
                                        control={form.control}
                                        name={LoginFormField.username.name}
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>{LoginFormField.username.label}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your username"
                                                        {...field}
                                                        required
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Password */}
                                    <FormField
                                        control={form.control}
                                        name={LoginFormField.password.name}
                                        render={({ field }) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel>{LoginFormField.password.label}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your password"
                                                        {...field}
                                                        type="password"
                                                        required
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <LoadingButton
                                        className="w-full my-2"
                                        isLoading={isLoading}
                                    >
                                        Login
                                    </LoadingButton>
                                </CardContent>
                                    
                                <CardFooter className="flex justify-center my-4">
                                    <p className="space-x-4">
                                        <span>Don't have account with us?</span>
                                        <Link to="/register">Register now</Link>
                                    </p>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </motion.div>
            </section>
        </AuthLayout>
    );
}
