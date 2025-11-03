import { z } from "zod";
import ApiTestDataFormField from "@/pages/backend/api_test/presentation/form/ApiTestDataFormField.ts";


// export const apiTestDataRowSchema = z.object({
//     enabled: z.number().optional(),
//     key: z.string().max(ApiTestDataFormField.key.max, { error: ApiTestDataFormField.key.maxError }).optional(),
//     value: z.string().max(ApiTestDataFormField.value.max, { error: ApiTestDataFormField.value.maxError }).optional(),
//     description: z.string().max(ApiTestDataFormField.description.max, { error: ApiTestDataFormField.description.maxError }).optional(),
// });


export const apiTestDataSchema = z.object({
    UUID: z.string().optional(),
    enabled: z.number().optional(),
    key: z.string().max(ApiTestDataFormField.key.max, { error: ApiTestDataFormField.key.maxError }).optional(),
    value: z.string().max(ApiTestDataFormField.value.max, { error: ApiTestDataFormField.value.maxError }).optional(),
    description: z.string().max(ApiTestDataFormField.description.max, { error: ApiTestDataFormField.description.maxError }).optional(),
    fieldType: z.string().optional(),
    isNew: z.number().optional(),
    isDelete: z.number().optional(),
});


export type ApiTestDataFormModel = z.infer<typeof apiTestDataSchema>;
