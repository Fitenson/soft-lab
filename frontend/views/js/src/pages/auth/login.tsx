import { motion } from "framer-motion";
import AuthLayout from "./presentation/layouts/auth-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useLoginForm from "./presentation/form/useLoginForm";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import useShowToast from "@/hooks/use-show-toast";
import Auth from "./domain/entity/Auth";
import useAuthService from "./domain/service/useAuthService";


export default function LoginPage() {
    const showToast = useShowToast();
    const { form, loginFormField, setFormError } = useLoginForm();
    const { login } = useAuthService();


    const submit = async () => {
        const formValues = form.getValues();
        const auth = new Auth(formValues);

        await login(auth, {
            onSuccess: (data) => {
                console.log(data);
                showToast("Success", "Login successfully", "success");
            },
            onError: (error) => {
                setFormError(error, {
                    setToastError(message) {
                        showToast("Success", message, "error");
                    },
                });
            }
        });
    }


    return (
        <AuthLayout>
            <section className="flex min-h-screen min-w-screen items-center justify-center">
                <motion.div
                    initial={{  opacity: 0, y: 20 }}
                    animate={{  opacity: 1, y: 0 }}
                    transition={{  duration: 0.6 }}
                    className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
                >
                    <Card className="rounded-2xl shadow-md">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold text-center">Soft Lab</CardTitle>
                            <CardDescription className="text-center text-2xl my-2 mb-2">Welcome Back</CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submit)}>
                                <CardContent className="space-y-6 mx-4">
                                    <FormField
                                        control={form.control}
                                        name={loginFormField.username}
                                        render={({ field}) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-xl">Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your username" {...field} required />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={loginFormField.password}
                                        render={({ field}) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-xl">Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your password" {...field} type="password" required />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button className="w-full my-2">
                                        Login
                                    </Button>
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
