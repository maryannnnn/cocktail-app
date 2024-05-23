import * as Yup from "yup";

export const validationSchemaDrink = Yup.object({
    strDrink: Yup.string().required('Required').min(4, 'must be at least 4 characters long')
        .max(100, 'must be less than 20 characters'),
    strInstructions: Yup.string().required('Required').min(4, 'must be at least 4 characters long')
        .max(100, 'must be less than 100 characters'),
});