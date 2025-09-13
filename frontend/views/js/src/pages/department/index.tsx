import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/layouts/app-layout.tsx";
import UserLayout from "@/pages/user/presentation/layouts/user-layout.tsx";
import HeadingSmall from "@/components/app/heading-small.tsx";
import { columns } from "@/pages/department/presentation/components/main/columns.tsx";
import breadcrumbItems from "@/components/app/breadcrumb-items.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
// import { useDispatch } from "react-redux";
// import { setIndexData } from "./presentation/redux/userDataTableSlice";
import DepartmentViewModel from "@/pages/department/presentation/view-models/DepartmentViewModel.ts";
import useDepartmentService from "@/pages/department/domain/service/useDepartmentService.tsx";
import DepartmentDataTable from "@/pages/department/presentation/components/main/department-data-table.tsx";


export default function DepartmentGridview() {
    // const dispatch = useDispatch();
    const { params } = useAppSelector(state => state.departmentDataTable);
    const { index } = useDepartmentService();

    const { data, refetch } = useQuery({
        queryKey: ["/department/index", params],
        queryFn: async () => index(params),
        enabled: true,
    });


    // useEffect(() => {
    //     if(data) {
    //         dispatch(setIndexData(data));
    //     }
    // }, [params, data, dispatch]);


    return (
        <AppLayout breadcrumbs={breadcrumbItems}>
        <Head title="User" />
            <UserLayout>
                <section className="w-full mx-auto">
                    <HeadingSmall title="Departments" />
                    <DepartmentDataTable<DepartmentViewModel>
                        data={data?.rows ?? []}
                        columns={columns}
                        onRefresh={refetch}
                    />
                </section>
            </UserLayout>
        </AppLayout>
    );
}
