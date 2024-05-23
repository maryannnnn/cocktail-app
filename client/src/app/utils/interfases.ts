import * as Yup from 'yup';
import {IDrinkNew} from "../../entities/cocktails/types/cocktailsTypes";

export interface ValidateStringCreateFieldParams {
    fieldName: string;
    value: string;
    validationSchema: Yup.ObjectSchema<any>;
    setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    form: { [key: string]: any };
}