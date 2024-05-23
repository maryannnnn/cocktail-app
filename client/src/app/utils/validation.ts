import { ValidationError } from 'yup';
import {
    ValidateStringCreateFieldParams,
} from "./interfases";

export const validateStringCreateField = async (
    {
        fieldName,
        value,
        validationSchema,
        setErrors,
        form
    }: ValidateStringCreateFieldParams): Promise<void> => {
    try {
        await validationSchema.validateAt(fieldName, { ...form, [fieldName]: value });
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
    } catch (validationError: unknown) {
        if (validationError instanceof ValidationError) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldName]: (validationError as ValidationError).message }));
        }
    }
};