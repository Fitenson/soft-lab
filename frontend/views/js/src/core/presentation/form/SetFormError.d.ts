interface SetFormErrorOptions {
    setToastError?: (message: string) => void;
}


type SetFormError = (error: unknown, options?: SetFormErrorOptions) => void;


export {
    SetFormError,
    SetFormErrorOptions
}