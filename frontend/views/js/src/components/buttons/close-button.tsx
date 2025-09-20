import { Button } from "@/components/ui/button.tsx";
import { X } from "lucide-react";


export default function CloseButton() {
    return (
        <Button
            variant="ghost"
            type="button"
            className="cursor-pointer rounded-full"

        >
            <X className="h-5 w-5 bg-accent-foreground dark:bg-accent-foreground" />
        </Button>
    );
}
