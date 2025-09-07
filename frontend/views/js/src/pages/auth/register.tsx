import { motion } from "framer-motion";
import AuthLayout from "./presentation/layouts/auth-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useRegisterForm from "./presentation/form/useRegisterForm";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import Auth from "./domain/entity/Auth";
import useAuthService from "./domain/service/useAuthService";
import useShowToast from "@/hooks/use-show-toast";


export default function RegisterPage() {
    const showToast = useShowToast();
    const { form, registerFormField, setFormError } = useRegisterForm();
    const { register } = useAuthService();


    const submit = async () => {
        const formValues = form.getValues();
        const auth = new Auth(formValues);

        await register(auth, {
            onSuccess: (data) => {
                console.log(data);
                showToast("Success", "Registration success", "success");
            },
            onError: (error) => {
                setFormError(error, {
                    setToast: (message) => {
                        showToast("Error", message, "error");
                    }
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
                            <CardDescription className="text-center text-2xl my-2 mb-2">Welcome New User</CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(submit)}>
                                <CardContent className="space-y-6 mx-4">
                                    <FormField
                                        control={form.control}
                                        name={registerFormField.fullName}
                                        render={({ field}) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-xl">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your full name" {...field} required />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={registerFormField.username}
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
                                        name={registerFormField.email}
                                        render={({ field}) => (
                                            <FormItem className="space-y-1">
                                                <FormLabel className="text-xl">Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your email" {...field} required />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={registerFormField.password}
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
                                        Register
                                    </Button>
                                </CardContent>
                                <CardFooter className="flex justify-center my-4">
                                    <p className="space-x-4">
                                        <span>Already have an account with us?</span>
                                        <Link to="/login">Login now</Link>
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
