import { useCallback } from "react";
import { toast } from "sonner";

type ToastStatus = "success" | "error" | "warning" | "info";


const useShowToast = () => {
    const showToast = useCallback(
        (title: string, description: string, status: ToastStatus) => {
            const safeDescription =
                description?.length >= 64
                    ? "Something wrong with the server"
                    : description;
            toast[status](title, {
                description: safeDescription,
                duration: 3000,
            });
        },
        []
    );

    return showToast;
};


export default useShowToast;
