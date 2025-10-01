import type React from "react";
import type { Button as ButtonType } from "../ui/button";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";


interface LoadingButtonProps extends React.ComponentProps<typeof ButtonType> {
    isLoading?: boolean;
}


export function LoadingButton({ isLoading, children, ...props }: LoadingButtonProps) {
    return (
        <Button disabled={isLoading} {...props} type="submit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {!isLoading && children}
        </Button>
    );
}
