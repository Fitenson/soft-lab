import { useForm } from "react-hook-form";
import { useState } from "react";
import ClientDatabaseViewModel from "@/pages/backend/client_database/presentation/view_models/ClientDatabaseViewModel.ts";
import type { ClientDatabaseDTO } from "@/pages/backend/client_database/data/dto/ClientDatabaseDTO.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type ClientDatabaseFormModel,
    clientDatabaseSchema
} from "@/pages/backend/client_database/presentation/schema/clientDatabaseSchema.ts";
import type { SetFormError, SetFormErrorOptions } from "@/core/presentation/form/SetFormError";
import { AxiosError } from "axios";


const useClientDatabaseForm = ({ clientDatabaseDTO }: { clientDatabaseDTO: ClientDatabaseDTO | undefined }) => {
    const [clientDatabaseViewModel, setClientDatabaseViewModel] = useState<ClientDatabaseViewModel | undefined>(
        () => (clientDatabaseDTO ? new ClientDatabaseViewModel(clientDatabaseDTO) : undefined)
    );


    const form = useForm<ClientDatabaseFormModel>({
        resolver: zodResolver(clientDatabaseSchema),
        defaultValues: {
            databaseName: clientDatabaseViewModel?.databaseName ?? "",
            databaseSchema: clientDatabaseViewModel?.databaseSchema ?? "",
            host: clientDatabaseViewModel?.host ?? "",
            port: clientDatabaseViewModel?.port ?? "",
            username: clientDatabaseViewModel?.username ?? "",
            password: clientDatabaseViewModel?.password ?? "",
        }
    });


    const setFormError: SetFormError = (
        error: unknown,
        options?: SetFormErrorOptions
    ) => {
        const { setToastError } = options || {};
        const axiosError = error as AxiosError<{ errors?: Record<string, string[]>}>;
        const errors = axiosError?.response?.data?.errors ?? {};

        if (typeof errors === "string") {
            setToastError?.(errors);
        } else if (errors && Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((field) => {
                const normalizedField = field.replace(/^clientDatabase\./, "") as keyof ClientDatabaseFormModel;

                if (normalizedField in form.getValues()) {
                    form.setError(normalizedField, {
                        type: "server",
                        message: errors[field][0] ?? "Invalid value",
                    });
                }
            });
        }
    }


    return {
        form,
        setFormError,
        clientDatabaseViewModel,
        setClientDatabaseViewModel,
    };
}


export default useClientDatabaseForm;