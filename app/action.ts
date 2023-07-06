'use server';
import validator from "validator";
import bcrypt from "bcrypt";

export const register = withValidate((data: any) => {
    // ...
})


export function withValidate(action: any) {
    return async (formData: FormData) => {
        'use server'

        const isValidData: string | boolean = verifyData(formData)

        if (!isValidData) {
            throw new Error(isValidData as string)
        }

        //const data = process(formData)
        return action(data)
    }
}


export function verifyData(formData: FormData) {
    const { firstName, lastName, email, phone, city, password } = formData;
    const errors: string[] = [];


    const validationSchema = [
        {
            valid: validator.isLength(firstName, {
                min: 1,
                max: 20,
            }),
            errorMessage: "First name is invalid",
        },
        {
            valid: validator.isLength(lastName, {
                min: 1,
                max: 20,
            }),
            errorMessage: "First name is invalid",
        },
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid",
        },
        {
            valid: validator.isMobilePhone(phone),
            errorMessage: "Phone number is invalid",
        },
        {
            valid: validator.isLength(city, { min: 1 }),
            errorMessage: "City is invalid",
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: "Password is not strong enough",
        },
    ];

    validationSchema.forEach((check) => {
        if (!check.valid) {
            errors.push(check.errorMessage);
        }
    });

    return errors.length === 0 ? errors[0] : false
}