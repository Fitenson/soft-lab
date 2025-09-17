import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import useShowToast from "@/hooks/use-show-toast";
import type { ProjectDTO } from "@/pages/project_management/project/data/dto/ProjectDTO";
import {Head, router, usePage} from "@inertiajs/react";
import useProjectForm from "@/pages/project_management/project/presentation/hooks/useProjectForm";
import useProjectService from "@/pages/project_management/project/domain/service/useProjectService.ts";
import breadcrumbItems from "@/components/app/breadcrumb-items.tsx";
import AppLayout from "@/layouts/app-layout.tsx";
import ProjectLayout from "@/pages/project_management/project/presentation/layouts/project-layout.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form.tsx";
import TopActionBar from "@/components/app/top-action-bar.tsx";
import ProjectFormField from "@/pages/project_management/project/presentation/form/ProjectFormField.ts";
import { Input } from "@/components/ui/input.tsx";


type Props = {
    project: ProjectDTO
}


export default function ProjectFormView() {
    const { project } = usePage<Props>().props;
    const isLoading = useAppSelector(state => state.loading.global);
    const showToast = useShowToast();
    const { form, setFormError, projectViewModel, setProjectViewModel } = useProjectForm({ projectDTO: project });
    const { createProject, updateProject, removeProject } = useProjectService();

    const breadcrumbs = [
        ...(breadcrumbItems ?? []),
        { title: projectViewModel?.projectCode ?? "Create", href: "/" },
    ];


    const submit = async () => {
        const formValues = form.getValues();
        const projectDTO: Partial<ProjectDTO> = {
            ...formValues,
            ...(projectViewModel?.UUID ? { UUID: projectViewModel?.UUID } : {}),
        };

        try {
            if(projectViewModel?.UUID) {
                const newProjectViewModel = await updateProject(projectDTO);
                setProjectViewModel(newProjectViewModel);
                showToast('Success', 'Update project successfully', 'success');
            } else {
                const newProjectViewModel = await createProject(projectDTO);
                showToast('Success', 'Create project successfully', 'success');

                router.visit(`/project_management/project/view?id=${newProjectViewModel.UUID}`);
            }
        } catch(error) {
            setFormError(error);
            showToast("Error", "Server error", "error");
        }
    }


    const handleRemoveProject = async () => {
        if(projectViewModel?.UUID) {
            const UUIDs = [projectViewModel.UUID];
            await removeProject(UUIDs, {
                onSuccess: (data) => {
                    if (data?.success && data?.success.length > 0) {
                        showToast("Success", "Successfully remove the project. Redirecting to main page", "success");
                        router.visit("/project_management/project/index");
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
            <Head title={projectViewModel?.projectCode ?? "Create"} />

            <ProjectLayout>
                <Form {...form}>
                    <form className="grid grid-cols-4 gap-6 w-full items-start" onSubmit={form.handleSubmit(submit)}>
                        <div className="col-span-4">
                            <TopActionBar
                                isLoading={isLoading}
                                saveAction
                                browseAction={{ to: "/project_management/project/index" }}
                                deleteAction={{ action: handleRemoveProject }}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name={ProjectFormField.projectCode.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{ProjectFormField.projectCode.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={ProjectFormField.projectName.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{ProjectFormField.projectName.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={ProjectFormField.description.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{ProjectFormField.description.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={ProjectFormField.secondDescription.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{ProjectFormField.secondDescription.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={ProjectFormField.moreDescription.name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{ProjectFormField.moreDescription.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </ProjectLayout>
        </AppLayout>
    );
}
