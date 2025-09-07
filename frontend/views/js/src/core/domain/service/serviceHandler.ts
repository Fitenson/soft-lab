export type ServiceCallback<T> = {
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
}


export async function handleServiceCall<T>(
    fn: () => Promise<T>,
    { onSuccess, onError }: ServiceCallback<T> = {}
) {
    try {
        const response = await fn();
        onSuccess?.(response);
        return response;
    } catch(error: unknown) {
        onError?.(error);
        throw error;
    }
}
