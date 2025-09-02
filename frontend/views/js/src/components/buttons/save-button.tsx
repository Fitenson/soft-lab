import { FaSave } from "react-icons/fa";
import { Button } from "@/components/ui/button";


type SaveButtonProps = {
    disabled?: boolean;
}


const SaveButton = ({ disabled = false }: SaveButtonProps) => {
    return(
        <Button
            type="submit"
            className="cursor-pointer"
            disabled={disabled}
        >
            <FaSave size={32} />
        </Button>
    );
}

export default SaveButton;
