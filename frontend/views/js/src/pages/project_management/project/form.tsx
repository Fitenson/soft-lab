import { useAppSelector } from "@/core/presentation/store/useAppSelector";
import useShowToast from "@/hooks/use-show-toast";
import type { ProjectDTO } from "@/pages/project_management/project/data/dto/ProjectDTO";
import { usePage } from "@inertiajs/react";
import useProjectForm from "@/pages/project_management/project/presentation/hooks/useProjectForm";


type Props = {
    project: ProjectDTO
}


export default function ProjectFormView() {
    const { project } = usePage<Props>().props;
    const isLoading = useAppSelector(state => state.loading.global);
    const showToast = useShowToast();
}