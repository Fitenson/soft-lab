import { Head, router } from "@inertiajs/react";
import { SelectValue } from "@radix-ui/react-select";

import breadcrumbItems from "@/components/app/breadcrumb-items";
import AppLayout from "@/layouts/app-layout";
import UserLayout from "@/pages/user/presentation/layouts/user-layout.tsx";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TopActionBar from "@/components/app/top-action-bar";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import useShowToast from "@/hooks/use-show-toast";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import useUserService from "@/pages/user/domain/service/useUserService";
import useUserForm from "@/pages/user/presentation/hooks/useUserForm.tsx";
import type { UserDTO } from "@/pages/user/data/dto/UserDTO.ts";
import UserFormField from "@/pages/user/presentation/form/UserFormField.ts";


type Props = {
    user: UserDTO
}


export default function UserFormView({ user }: Props) {
    const isLoading = useAppSelector(state => state.loading.global);
    const showToast = useShowToast();
    const { form, setFormError, userViewModel, setUserViewModel } = useUserForm({ userDTO: user });
    const { create, update } = useUserService();

    const breadcrumbs = [
        ...breadcrumbItems,
        { title: userViewModel?.username || "Create", href: '/' }
    ];


    const submit = async () => {
        const formValues = form.getValues();
        const userDTO: Partial<UserDTO> = { ...formValues };

        try {
            if(userViewModel?.UUID) {
                const newUserViewModel = await update(userDTO);
                setUserViewModel(newUserViewModel);
                showToast('Success', 'Update user successfully', 'success');
            } else {
                const newUserViewModel = await create(userDTO);
                setUserViewModel(newUserViewModel);
                showToast('Success', 'Create user successfully', 'success');

                router.visit(`/user/${userViewModel?.UUID}`);
            }
        } catch(error) {
            setFormError(error);
            showToast("Error", "Error on create", "error");
        }
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />
            <Head title={userViewModel?.fullName ?? "Create"} />

            <UserLayout>
                <Form {...form}>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full items-start" onSubmit={form.handleSubmit(submit)}>
                        <TopActionBar
                            saveAction={{}}
                            browseAction={{ to: "/user" }}
                            deleteAction={{ action: () => {} }}
                        />

                        <FormField
                            control={form.control}
                            name={UserFormField.username.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{UserFormField.username.label}</FormLabel>
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
                            control={form.control}
                            name={UserFormField.fullName.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{UserFormField.fullName.label}</FormLabel>
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
                            control={form.control}
                            name={UserFormField.email.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{UserFormField.email.label}</FormLabel>
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
                            control={form.control}
                            name={UserFormField.gender.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{UserFormField.gender.label}</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
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
                            control={form.control}
                            name={UserFormField.description.name}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>{UserFormField.description.label}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value ?? ""}
                                            disabled={isLoading}
                                            rows={4}
                                            style={{  resize: 'vertical', overflowY: 'auto', maxHeight: '4rem' }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={UserFormField.address.name}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>{UserFormField.address.label}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value ?? ""}
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
