import { Head } from "@inertiajs/react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/layouts/app-layout";
import UserLayout from "@/pages/user/presentation/layouts/user-layout.tsx";
import HeadingSmall from "@/components/app/heading-small";
import UserDataTable from "@/pages/user/presentation/components/main/user-data-table.tsx";
import { userMainColumns } from "@/pages/user/presentation/components/main/userMainColumns.tsx";
import breadcrumbItems from "@/components/app/breadcrumb-items";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";
// import { useDispatch } from "react-redux";
// import { setIndexData } from "./presentation/redux/userDataTableSlice";
import useUserService from "@/pages/user/domain/service/useUserService";
import UserViewModel from "@/pages/user/presentation/view-models/UserViewModel";


export default function UserGridview() {
    // const dispatch = useDispatch();
    const { params } = useAppSelector(state => state.userDataTable);
    const { index } = useUserService();

    const { data, refetch } = useQuery({
        queryKey: ["/user/index", params],
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
