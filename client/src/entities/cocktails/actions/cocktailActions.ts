import axios from "axios";
import {BASIS_URL} from "../../../app/config/config";
import {ICocktail} from "../types/cocktailsTypes";
import drinksData from '../../../app/assets/drinks/drinks.json';

export const getCocktailsAction = async (letter: string): Promise<ICocktail[]> => {
    try {
        const response = await axios.get(`${BASIS_URL}/search.php?f=${letter}`);
        return response.data.drinks || [];
    } catch (e) {
        throw new Error('Failed to fetch cocktails');
    }
};


export const getDrinkAction = async (id: string): Promise<ICocktail> => {
    try {
        const response = await axios.get<{ drinks: ICocktail[] }>(`${BASIS_URL}/lookup.php?i=${id}`);
        const drinks = response.data.drinks;
        if (drinks && drinks.length > 0) {
            return drinks[0];
        } else {
            const transformedDrinksData: ICocktail[] = drinksData
            .filter(item => item.idDrink === id)
            .map((drink) => ({
                ...drink,
                dateModified: new Date(drink.dateModified)
            }));

            if(transformedDrinksData.length > 0) {
                return transformedDrinksData[0]
            }
        }
        throw new Error('Drink not found');
    } catch (e) {
        console.error(e);
        throw new Error('Failed to fetch cocktail');
    }
};