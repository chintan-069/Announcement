/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { object, string } from 'yup';
import * as yup from 'yup';
 
export let userSchema = object().shape({
    fullname: string().required("firstname is required").trim(),
    studentId: string().required("lastname is required").trim(),
    phone: string().required("contact is required").max(10),
    email: string().email().required('email is required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'invalid email address').trim(),
    address: string().trim().required("address is required"),
    course: string().trim().required("course is required"),
    courseStartdate: string().required(),
    dateOfBirth: string().required(),
});
 
// const user = await userSchema.validate(data);
export const validateData = async (data: any) => {
    try {
        await userSchema.validate(data, { abortEarly: false });
        // SubmitData(formData);
        console.log(true);
 
        return { data: data, success: true };
 
    } catch (error) {
        const errors: Record<string, string> = {};
 
        (error.inner as yup.ValidationError[]).forEach((error: yup.ValidationError) => {
            const fieldName = error.path as keyof Record<string, string>;
            const errorMessage = error.message;
 
            errors[fieldName] = errorMessage;
        });
        // setErrors(errors);
        return { data: errors, success: false };
 
    }
}
 