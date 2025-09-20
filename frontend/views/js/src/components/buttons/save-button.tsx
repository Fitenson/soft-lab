import { FaSave } from "react-icons/fa";
import { Button } from "@/components/ui/button";


type SaveButtonProps = {
    disabled?: boolean;
}


const SaveButton = ({ disabled = false }: SaveButtonProps) => {
    return(
        <Button
            variant="ghost"
            type="submit"
            className="cursor-pointer rounded-full"
            disabled={disabled}
        >
            <FaSave size={32} />
        </Button>
    );
}

export default SaveButton;
