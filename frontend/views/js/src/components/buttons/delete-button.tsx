import { MdAutoDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";


type DeleteButtonProps = {
    onDelete?: () => void;
    disabled?: boolean;
};



const DeleteButton = ({ onDelete, disabled = false }: DeleteButtonProps) => {
    return(
        <Button
            variant={"destructive"}
            type="button"
            className="cursor-pointer rounded-full bg-destructive dark:bg-destructive"
            disabled={disabled}
            onClick={onDelete}
        >
            <MdAutoDelete size={32} />
        </Button>
    );
}

export default DeleteButton;
