import { useCallback } from "react";
import { toast } from "sonner";

type ToastStatus = "success" | "error" | "warning" | "info";


const useShowToast = () => {
    const showToast = useCallback((title: string, description: string, status: ToastStatus) => {
        toast[status](title, {
            description,
            duration: 3000,
        });
    }, []);

    return showToast;
};


export default useShowToast;
