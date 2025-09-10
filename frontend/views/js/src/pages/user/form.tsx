import { Head, router } from "@inertiajs/react";
import { SelectValue } from "@radix-ui/react-select";

import breadcrumbItems from "@/components/breadcrumb-items";
import AppLayout from "@/layouts/app-layout";
import UserLayout from "@/layouts/user/layout";

import User from "@/pages/user/data/models/User";
import UserForm from "@/pages/user/presentation/form/UserForm";
import { UserModel } from "./presentation/schema/userSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TopActionBar from "@/components/custom/top-action-bar";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import useShowToast from "@/hooks/use-show-toast";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import useUserService from "@/pages/user/domain/service/useUserService";
import useUserForm from "./presentation/form/useUserForm";


type Props = {
    userData: UserModel
}


export default function UserFormView({ userData }: Props) {
    const user = new User(userData);
    const isLoading = useAppSelector(state => state.loading.global);
    const showToast = useShowToast();
    const { userForm, setUserFormError } = useUserForm({ user: user });
    // const { createUser, updateUser } = useUserService();


    const breadcrumbs = [
        ...breadcrumbItems,
        { title: user.getName() || "Create", href: '/' }
    ];


    const submit = async () => {
        const formValues = userForm.getValues();

        try {
            let response;

            if(!isEmpty(user.getId())) {
                response = await updateUser({ user: user, formValues: formValues });

                showToast('Success', 'Update user successfully', 'success');
            } else {
                response = await createUser({ formValues: formValues });
                showToast('Success', 'Create user successfully', 'success');

                console.log(response);
                router.visit(`/user/${response?.userId}`);
            }
        } catch(error) {
            setUserFormError(error);
            showToast("Error", "Error on create", "error");
        }
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <Head title={user.name} />

            <UserLayout>
                <Form {...userForm}>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start" onSubmit={userForm.handleSubmit(submit)}>
                        <TopActionBar
                            saveAction={{}}
                            browseAction={{ to: "/user" }}
                            deleteAction={{ action: () => {} }}
                        />

                        <FormField
                            control={userForm.control}
                            name={UserForm.getName()}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={userForm.control}
                            name={UserForm.getFullName()}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={userForm.control}
                            name={UserForm.getEmail()}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={userForm.control}
                            name={UserForm.getGender()}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Gender</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Others">Others</SelectItem>
                                                <SelectItem value="Rather not say">Rather not say</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-row col-span-full w-full gap-6 items-start">
                        <FormField
                            control={userForm.control}
                            name={UserForm.getDescription()}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isLoading}
                                            rows={4}
                                            style={{  resize: 'vertical', overflowY: 'auto', maxHeight: '4rem' }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={userForm.control}
                            name={UserForm.getAddress()}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isLoading}
                                            rows={4}
                                            style={{  resize: 'vertical', overflowY: 'auto', maxHeight: '4rem' }}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        </div>
                    </form>
                </Form>
            </UserLayout>
        </AppLayout>
    );
}
