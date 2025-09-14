import { createFormField } from "@/lib/utils.ts";


const UserFormField = {
    username: createFormField({ name: "username", label: "Username", max: 100 }),
    // profileImage: createFormField({ name: "profileImage", label: "Profile Image", max: 255 }),
    fullName: createFormField({ name: "fullName", label: "Full name", max: 255 }),
    email: createFormField({ name: "email", label: "Email", max: 100 }),
    role: createFormField({ name: "role", label: "Role", max: 50 }),
    address: createFormField({ name: "address", label: "Address", max: 500 }),
    description: createFormField({ name: "description", label: "Description", max: 500 }),
    department: createFormField({ name: "department", label: "Department", max: 500 }),
    title: createFormField({ name: "title", label: "Title", max: 50 }),
    gender: createFormField({ name: "gender", label: "Gender", max: 50 }),
    phoneNo: createFormField({ name: "phoneNo", label: "Phone No", max: 50 }),
    createdAtFormat: createFormField({ name: "createdAtFormat", label: "Created At" }),
};

export default UserFormField;
