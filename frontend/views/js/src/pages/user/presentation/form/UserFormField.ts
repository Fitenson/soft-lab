import type { FormFieldType } from "@/types";
import User from "@/pages/user/domain/entity/UserEntity";


export default class UserFormField {
    static fields(): Record<string, FormFieldType> {
        return {
            username: {
                name: "username",
                label: "Username",
                max: User.usernameMax,
            },
            fullName: {
                name: "fullName",
                label: "Full Name",
                max: User.fullNameMax
            },
            email: {
                name: "email",
                label: "Email",
                max: User.emailMax
            },
            description: {
                name: "description",
                label: "Description",
                max: User.descriptionMax
            },
            address: {
                name: "address",
                label: "Address",
                max: User.addressMax
            },
            gender: {
                name: "gender",
                label: "Gender",
                max: User.genderMax
            },
            title: {
                name: "title",
                label: "Title",
                max: User.titleMax
            },
            phoneNo: {
                name: "phoneNo",
                label: "Phone No",
                max: User.phoneNoMax
            }
        };
    }


    static usernameMaxError() {
        return `${this.fields().username.label} cannot exceed ${this.fields().username.max} characters`;
    }

    static fullNameMaxError() {
        return `${this.fields().fullName.label} cannot exceed ${this.fields().fullName.max} characters`;
    }

    static genderMaxError() {
        return `${this.fields().gender.label} cannot exceed ${this.fields().gender.max} characters`;
    }

    static titleMaxError() {
        return `${this.fields().title.label} cannot exceed ${this.fields().title.max} characters`;
    }

    static phoneNoMaxError() {
        return `${this.fields().title.label} cannot exceed ${this.fields().title.max} characters`;
    }

    static emailMaxError() {
        return `${this.fields().title.label} cannot exceed ${this.fields().title.max} characters`;
    }

    static descriptionMaxError() {
        return `${this.fields().title.label} cannot exceed ${this.fields().title.max} characters`;
    }

    static addressMaxError() {
        return `${this.fields().title.label} cannot exceed ${this.fields().title.max} characters`;
    }
}
