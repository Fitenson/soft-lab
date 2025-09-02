import { IoMdRefresh } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/core/presentation/store/useAppSelector";


interface RefreshButtonProps {
    onRefresh: () => void;
}


const RefreshButton = ({ onRefresh }: RefreshButtonProps) => {
    const isLoading = useAppSelector(state => state.loading.global);


    return (
        <Button
            className="cursor-pointer"
            onClick={onRefresh}
            disabled={isLoading}
        >
            <IoMdRefresh size={32} />
        </Button>
    );
}


export default RefreshButton;
