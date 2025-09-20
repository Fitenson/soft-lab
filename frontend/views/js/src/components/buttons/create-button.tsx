import { MdCreateNewFolder } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";


type CreateButtonProps = {
    to: string;
    disabled?: boolean;
};

const CreateButton = ({ to, disabled = false }: CreateButtonProps) => {
    const handleGoCreatePage = () => {
        router.visit(to);
    }


    return(
        <Button
            variant="ghost"
            type="submit"
            className="cursor-pointer rounded-full"
            onClick={handleGoCreatePage}
            disabled={disabled}
        >
            <MdCreateNewFolder size={40} />
        </Button>
    );
}

export default CreateButton;
