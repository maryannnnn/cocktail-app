import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import { IDrinkNew } from "../../entities/cocktails/types/cocktailsTypes";
import {
    validateStringCreateField
} from '../../app/utils/validation';
import { validationSchemaDrink } from "./validation-drink";
import { FormDrinkCreateProps } from "./interface";
import { selectCategory, selectGlass, selectAlcoholic, selectIngredient } from '../../shared/select-options/select-options';
import Button from "../../shared/btn/Button";
import Input from "../../shared/input/Input";
import Select from "../../shared/select/Select";
import { MessageBox, LoadingBox } from '../../shared/box/boxes';
import { createNewDrink } from './addNewDrink'

const FormDrinkCreate: FC<FormDrinkCreateProps> = ({ setModalOpenCreate, drinkDataAssets, setDrinkDataAssets, setErrorBox = () => { }, setMessageBoxVariant }) => {

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formValid, setFormValid] = useState(false);
    const [form, setForm] = useState<IDrinkNew>({
        strDrink: '',
        strCategory: '',
        strAlcoholic: '',
        strInstructions: '',
        strGlass: '',
        strDrinkThumb: '',
        strIngredient1: '',
        strIngredient2: '',
        strIngredient3: '',
        strIngredient4: '',
        strMeasure1: '',
        strMeasure2: '',
        strMeasure3: '',
        strMeasure4: '',
    });

    useEffect(() => {
        if (errors.strDrink !== '' || errors.strInstructions !== '') {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [errors]);


    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        setFormValid(false);

        if (type === 'text') {
            validateStringCreateField({
                fieldName: name,
                value: value,
                validationSchema: validationSchemaDrink,
                setErrors: setErrors,
                form: form
            });
        }

        setErrors({ ...errors, [name]: '' });
        setForm({ ...form, [name]: value });
        console.log("form: ", form)
    };

    const handleClose = () => {

        setModalOpenCreate(false);

        setForm({
            strDrink: '',
            strCategory: '',
            strAlcoholic: '',
            strInstructions: '',
            strGlass: '',
            strDrinkThumb: '',
            strIngredient1: '',
            strIngredient2: '',
            strIngredient3: '',
            strIngredient4: '',
            strMeasure1: '',
            strMeasure2: '',
            strMeasure3: '',
            strMeasure4: '',
        })
    }

    const handleAddDrink = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("handleAddDrink");

        if (formValid) {
            const NewDrink = createNewDrink(form);
            setDrinkDataAssets([...drinkDataAssets, NewDrink]);
        }

        setForm({
            strDrink: '',
            strCategory: '',
            strAlcoholic: '',
            strInstructions: '',
            strGlass: '',
            strDrinkThumb: '',
            strIngredient1: '',
            strIngredient2: '',
            strIngredient3: '',
            strIngredient4: '',
            strMeasure1: '',
            strMeasure2: '',
            strMeasure3: '',
            strMeasure4: '',
        })

        setModalOpenCreate(false);

        if (errors) {
            setErrorBox(errors.message);
            setMessageBoxVariant('errorVariant')

        } else {
            setMessageBoxVariant('successVariant')
        }
    };

    return (
      <>
        <h2>Add Drink</h2>
        <div>
          <label className=""></label>
          <Input
            type="text"
            name="strDrink"
            onChange={changeHandler}
            value={form.strDrink}
            placeholder="Put name of Drink"
          />
          <label className=""></label>
          <Select
            name="strCategory"
            value={form.strCategory}
            onChange={changeHandler}
            options={selectCategory}
          />
          <label className=""></label>
          <Select
            name="strAlcoholic"
            value={form.strAlcoholic}
            onChange={changeHandler}
            options={selectAlcoholic}
          />
          <label className=""></label>
          <Input
            type="text"
            name="strInstructions"
            onChange={changeHandler}
            value={form.strInstructions}
            placeholder="Put Instructions"
          />
          <label className=""></label>
          <Select
            name="strGlass"
            value={form.strGlass}
            onChange={changeHandler}
            options={selectGlass}
          />
          <label className=""></label>
          <Select
            name="strIngredient1"
            value={form.strIngredient1}
            onChange={changeHandler}
            options={selectIngredient}
          />

          <div className="">
            <Button className="button" onClick={handleAddDrink}>
              Add
            </Button>
            <Button className="button" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </div>
      </>
    );
};

export default FormDrinkCreate;