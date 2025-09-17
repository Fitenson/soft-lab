import { useForm } from "react-hook-form";
import ProjectViewModel from "@/pages/project_management/project/presentation/view_models/ProjectViewModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormModel } from "@/pages/project_management/project/presentation/schema/projectSchema";
import type { ProjectDTO } from "@/pages/project_management/project/data/dto/ProjectDTO";
import { useState } from "react";
import type { SetFormError, SetFormErrorOptions } from "@/core/presentation/form/SetFormError";
import { AxiosError } from "axios";


const useProjectForm = ({ projectDTO }: { projectDTO: ProjectDTO | null }) => {
    const [projectViewModel, setProjectViewModel] = useState<ProjectViewModel | undefined>(
        () => (projectDTO ? new ProjectViewModel(projectDTO) : undefined)
    );

    const form = useForm<ProjectFormModel>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            projectCode: projectViewModel?.projectCode ?? "",
            projectName: projectViewModel?.projectName ?? "",
            description: projectViewModel?.description ?? "",
            secondDescription: projectViewModel?.secondDescription ?? "",
            moreDescription: projectViewModel?.moreDescription ?? "",
        }
    });


    const setFormError: SetFormError = (
        error: unknown,
        options?: SetFormErrorOptions
    ) => {
        const { setToastError } = options || {};
        const axiosError = error as AxiosError<{ errors?: Record<string, string[]>}>;
        const errors = axiosError?.response?.data?.errors ?? {};

        if (typeof errors === "string") {
            setToastError?.(errors);
        } else if (errors && Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((field) => {
                const normalizedField = field.replace(/^project\./, "") as keyof ProjectFormModel;

                if (normalizedField in form.getValues()) {
                    form.setError(normalizedField, {
                        type: "server",
                        message: errors[field][0] ?? "Invalid value",
                    });
                }
            });
        }
    }


    return {
        form,
        setFormError,
        projectViewModel,
        setProjectViewModel,
    };
};


export default useProjectForm;
