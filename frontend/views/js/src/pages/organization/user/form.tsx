import { Head, router, usePage } from "@inertiajs/react";
import { SelectValue } from "@radix-ui/react-select";

import breadcrumbItems from "@/components/app/breadcrumb-items.tsx";
import AppLayout from "@/layouts/app-layout.tsx";
import UserLayout from "@/pages/organization/user/presentation/layouts/user-layout.tsx";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import { FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import TopActionBar from "@/components/app/top-action-bar.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
import useShowToast from "@/hooks/use-show-toast.ts";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select.tsx";
import useUserService from "@/pages/organization/user/domain/service/useUserService.tsx";
import useUserForm from "@/pages/organization/user/presentation/hooks/useUserForm.tsx";
import type { UserDTO } from "@/pages/organization/user/data/dto/UserDTO.ts";
import UserFormField from "@/pages/organization/user/presentation/form/UserFormField.ts";
import type { Role } from "@/pages/organization/user/presentation/types";


type Props = {
    user: UserDTO
}


export default function UserFormView() {
    const { user } = usePage<Props>().props;
    const isLoading = useAppSelector(state => state.loading.global);
    const showToast = useShowToast();
    const { form, setFormError, userViewModel, setUserViewModel } = useUserForm({ userDTO: user });
    const { createUser, updateUser, removeUser } = useUserService();

    const breadcrumbs = [
        ...(breadcrumbItems ?? []),
        { title: userViewModel?.username ?? "Create", href: '/' }
    ];

    const roles: Role[] = [
        { value: "Admin", label: "Admin" },
        { value: "Supervisor", label: "Supervisor" },
        { value: "User", label: "User" },
        { value: "Developer", label: "Developer" },
    ];


    const submit = async () => {
        const formValues = form.getValues();
        const userDTO: Partial<UserDTO> = {
            ...formValues,
            ...(userViewModel?.UUID ? { UUID: userViewModel?.UUID } : {}),
        };


        try {
            if(userViewModel?.UUID) {
                const newUserViewModel = await updateUser(userDTO);
                setUserViewModel(newUserViewModel);
                showToast('Success', 'Update user successfully', 'success');
            } else {
                const newUserViewModel = await createUser(userDTO);
                showToast('Success', 'Create user successfully', 'success');

                router.visit(`/organization/user/view?id=${newUserViewModel.UUID}`);
            }
        } catch(error) {
            setFormError(error);
            showToast("Error", "Server error", "error");
        }
    }


    const handleRemoveUser = async () => {
        if (userViewModel?.UUID) {
            const UUIDs = [userViewModel.UUID];
             await removeUser(UUIDs, {
                 onSuccess: async (data) => {
                     if(data?.success && data?.success.length > 0) {
                         showToast("Success", "Successfully remove the user. Redirecting to main page", "success");
                         router.visit("/organization/user/index");
                     } else {
                         showToast("Error", "Failed to remove the user", "error");
                     }
                 },
                 onError: async () => {
                     showToast("Error", "Something wrong with the server", "error");
                 }
             });
        }
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={userViewModel?.fullName ?? "Create"} />

            <UserLayout>
                <Form {...form}>
                    <form className="grid grid-cols-4 gap-6 w-full items-start" onSubmit={form.handleSubmit(submit)}>
                        <div className="col-span-4">
                            <TopActionBar
                                isLoading={isLoading}
                                saveAction
                                browseAction={{ to: "/organization/user/index" }}
                                deleteAction={{ action: handleRemoveUser }}
                            />
                        </div>
                
                        {/* <FormField
                            control={form.control}
                            name={UserFormField.profileImage.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{UserFormField.profileImage.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        /> */}
                
                        <FormField
                            control={form.control}
                            name={UserFormField.username.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{UserFormField.username.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            required
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
                                            required
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                
                
                        <FormField
                            control={form.control}
                            name={UserFormField.title.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{UserFormField.title.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? undefined}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                
                
                        <FormField
                            control={form.control}
                            name={UserFormField.phoneNo.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{UserFormField.phoneNo.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value ?? undefined}
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
                                <FormItem className="w-full">
                                    <FormLabel>{UserFormField.gender.label}</FormLabel>
                                    <FormControl className="w-full">
                                        <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={UserFormField.gender.label} />
                                            </SelectTrigger>
                                            <SelectContent className="w-full">
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

                
                        <FormField
                            control={form.control}
                            name={UserFormField.role.name}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>{UserFormField.role.label}</FormLabel>
                                    <FormControl className="w-full">
                                        <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={UserFormField.role.label} />
                                            </SelectTrigger>
                                            <SelectContent className="w-full">
                                                {roles.map((role) => (
                                                    <SelectItem value={role.value}>{role.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                
                
                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name={UserFormField.department.name}*/}
                        {/*    render={({ field }) => (*/}
                        {/*        <FormItem>*/}
                        {/*            <FormLabel>{UserFormField.department.label}</FormLabel>*/}
                        {/*            <FormControl>*/}
                        {/*                <Input*/}
                        {/*                    {...field}*/}
                        {/*                    value={field.value ?? undefined}*/}
                        {/*                    disabled={isLoading}*/}
                        {/*                />*/}
                        {/*            </FormControl>*/}
                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}
                        {/*    )}*/}
                        {/*/>*/}
                
                        <FormField
                            control={form.control}
                            name={UserFormField.description.name}
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>{UserFormField.description.label}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value ?? ""}
                                            disabled={isLoading}
                                            rows={4}
                                            style={{  resize: 'vertical', overflowY: 'auto', maxHeight: '8rem', minHeight: '8rem' }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                
                        <FormField
                            control={form.control}
                            name={UserFormField.address.name}
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>{UserFormField.address.label}</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value ?? ""}
                                            disabled={isLoading}
                                            rows={4}
                                            style={{  resize: 'vertical', overflowY: 'auto', maxHeight: '8rem', minHeight: '8rem' }}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </UserLayout>
        </AppLayout>
    );
}
