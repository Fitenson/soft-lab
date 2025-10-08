import { z } from "zod";
import ApiTestFormField from "@/pages/backend/api_test/presentation/form/ApiTestFormField.ts";
import {apiTestDataSchema} from "@/pages/backend/api_test/presentation/schema/apiTestDataSchema.ts";


export const apiTestSchema = z.object({
    testName: z.string().max(ApiTestFormField.testName.max, { error: ApiTestFormField.testName.maxError }),
    parentApiTest: z.string().optional(),
    clientDatabase: z.string(),
    project: z.string(),
    isFolder: z.number(),
    transmission: z.string(),
    description: z.string().max(ApiTestFormField.description.max, { error: ApiTestFormField.description.maxError }).optional(),
    moreDescription: z.string().max(ApiTestFormField.moreDescription.max, { error: ApiTestFormField.moreDescription.maxError }).optional(),
}).extend({
    apiTestData: z.array(apiTestDataSchema).default([]).optional(),
});


export type ApiTestFormModel = z.infer<typeof apiTestSchema>;
