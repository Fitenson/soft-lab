import { FaTable } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";


type BrowseButtonProps = {
    to: string;
    disabled?: boolean;
}


const BrowseButton = ({ to, disabled = false }: BrowseButtonProps) => {
    const handleGoBack = () => {
        router.visit(to);
    }


    return(
        <Button
            className="cursor-pointer flex items-center gap-2"
            type="button"
            variant="ghost"
            onClick={handleGoBack}
            disabled={disabled}
        >
            <FaTable size={40} />
        </Button>
    );
}

export default BrowseButton;
