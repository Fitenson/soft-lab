import { createFormField } from "@/lib/utils.ts";


const RegisterFormField = {
    username: createFormField({ name: "username", label: "Username", max: 100 }),
    fullName: createFormField({ name: "fullName", label: "Full name", max: 255 }),
    email: createFormField({ name: "email", label: "Email", max: 100 }),
    password: createFormField({ name: "password", label: "Password", max: 50, min: 5 }),
};

export default RegisterFormField;
