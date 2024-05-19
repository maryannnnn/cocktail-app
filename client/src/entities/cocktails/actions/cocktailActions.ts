import axios from "axios";
import {BASIS_URL} from "../../../app/config/config";
import {ICocktail} from "../types/cocktailsTypes";

export const getCocktailsAction = async (letter: string): Promise<ICocktail[]> => {
    try {
        const response = await axios.get(`${BASIS_URL}/search.php?f=${letter}`);
        return response.data.drinks || [];
    } catch (e) {
        throw new Error('Failed to fetch cocktails');
    }
};