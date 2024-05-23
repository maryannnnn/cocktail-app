import { ICocktail } from "../../entities/cocktails/types/cocktailsTypes";
import { IIngredient } from "../../entities/ingredients/types/ingredientTypes";
import { BASIS_URL_INGREDIENT } from "../../app/config/config";

export const getIngredientsCocktail = async (cocktail: ICocktail): Promise<IIngredient[]> => {
  
  const ingredients: IIngredient[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof ICocktail] as | string | null;
    const measure = cocktail[`strMeasure${i}` as keyof ICocktail] as | string | null;

    if (ingredient && measure) {
      const urlImageSmall = `${BASIS_URL_INGREDIENT}/${ingredient.toLowerCase()}-Small.png`;
      const urlImageMedium = `${BASIS_URL_INGREDIENT}/${ingredient.toLowerCase()}-Medium.png`;
      const urlImage = `${BASIS_URL_INGREDIENT}/${ingredient.toLowerCase()}.png`;
      
      ingredients.push({
        ingredientId: i,
        ingredientName: ingredient,
        ingredientUrlImageSmall: urlImageSmall,
        ingredientUrlImageMedium: urlImageMedium,
        ingredientUrlImage: urlImage,
        ingredientMeasure: measure,
      });
    }
  }

  return ingredients;
};
