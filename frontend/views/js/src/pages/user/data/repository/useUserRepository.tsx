import { useRequest } from "@/lib/useRequest";
import type User from "@/pages/user/domain/entity/User";

const useUserRepository = () => {
    const { request } = useRequest();

    const index = async () => {}

    const create = async (user: User) => {}

    return {
        index,
        create
    };
}
