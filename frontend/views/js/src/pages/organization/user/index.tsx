import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/layouts/app-layout.tsx";
import UserLayout from "@/pages/organization/user/presentation/layouts/user-layout.tsx";
import HeadingSmall from "@/components/app/heading-small.tsx";
import UserDataTable from "@/pages/organization/user/presentation/components/main/user-data-table.tsx";
import { userMainColumns } from "@/pages/organization/user/presentation/components/main/userMainColumns.tsx";
import breadcrumbItems from "@/components/app/breadcrumb-items.tsx";
import { useAppSelector } from "@/core/presentation/store/useAppSelector.ts";
// import { useDispatch } from "react-redux";
// import { setIndexData } from "./presentation/redux/userDataTableSlice";
import useUserService from "@/pages/organization/user/domain/service/useUserService.tsx";
import UserViewModel from "@/pages/organization/user/presentation/view-models/UserViewModel.ts";
import type {BreadcrumbItem} from "@/types";


export default function UserGridview() {
    // const dispatch = useDispatch();
    const { params } = useAppSelector(state => state.userDataTable);
    const { index } = useUserService();

    const { data, refetch } = useQuery({
        queryKey: ["/organization/user/index", params],
        queryFn: async () => index(params),
        enabled: true,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        ...(breadcrumbItems ?? []),
        { title: "User", href: "/organization/user" },
    ];

    // useEffect(() => {
    //     if(data) {
    //         dispatch(setIndexData(data));
    //     }
    // }, [params, data, dispatch]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User" />

            <UserLayout>
                <section className="w-full mx-auto">
                    <HeadingSmall title="Users" />
                    <UserDataTable<UserViewModel>
                        data={data?.rows ?? []}
                        columns={userMainColumns}
                        onRefresh={refetch}
                    />
                </section>
            </UserLayout>
        </AppLayout>
    );
}
