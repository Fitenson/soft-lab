import { motion } from "framer-motion";
import AuthLayout from "./presentation/layouts/auth-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useLoginForm from "./presentation/form/useLoginForm";
import { Input } from "@/components/ui/input";
import Link from "@/components/ui/link";


export default function LoginPage() {
    const { form, loginFormField } = useLoginForm();


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
                            <form>
                                <CardContent className="space-y-6 mx-4">
                                    <FormField
                                        control={form.control}
                                        name={loginFormField.username}
                                        render={({ field}) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-xl">Username</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your username" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={loginFormField.password}
                                        render={({ field}) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="text-xl">Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your password" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter className="text-center my-4">
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
