import { createFormField } from "@/lib/utils.ts";


const LoginFormField = {
    username: createFormField({ name: "username", label: "Username", max: 100 }),
    password: createFormField({ name: "password", label: "Password", max: 50 }),
};

export default LoginFormField;
