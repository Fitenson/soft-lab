import { createFormField } from "@/lib/utils.ts";


const ApiTestFormField = {
    parentApiTest: createFormField({ name: "parentApiTest", label: "Parent Api Test" }),
    clientDatabase: createFormField({ name: "clientDatabase", label: "Client Database" }),
    project: createFormField({ name: "project", label: "Project" }),
    testName: createFormField({ name: "testName", label: "Test Name", max: 50 }),
    data: createFormField({ name: "data", label: "Data" }),
    isFolder: createFormField({ name: "isFolder", label: "isFolder" }),
    transmission: createFormField({ name: "transmission", label: "Body" }),
    description: createFormField({ name: "description", label: "Description" }),
    moreDescription: createFormField({ name: "moreDescription", label: "More Description" }),
    output: createFormField({ name: "output", label: "Output" }),
    scenario: createFormField({ name: "scenario", label: "Scenario" }),
};


export default ApiTestFormField;
