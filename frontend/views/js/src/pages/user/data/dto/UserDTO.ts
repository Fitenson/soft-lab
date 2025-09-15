export interface UserDTO {
    UUID: string;
    username: string;
    fullName: string;
    profileImage: string | null;
    email: string;
    role: string | null;
    description: string | null;
    address: string | null;
    gender: string | null;
    title: string | null;
    phoneNo: string | null;
    valid: boolean;
    createdAtFormat: string | null;
    createdByName: string | null;
    updatedAtFormat: string | null;
    updatedByName: string | null;
}
