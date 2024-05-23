import "./cocktail-page.scss";
import "./media.scss";
import React, { useEffect, useState, FC } from "react";
import { MessageBox, LoadingBox } from "../../shared/box/boxes";
import { getDrinkAction } from "../../entities/cocktails/actions/cocktailActions";
import { useParams, NavLink } from "react-router-dom";
import { ICocktail } from "../../entities/cocktails/types/cocktailsTypes";
import { IIngredient } from "../../entities/ingredients/types/ingredientTypes";
import { getIngredientsCocktail } from "../../features/ingredients/getIngredientsCocktail";
import IngredientsBlock from "../../widgets/inredients-block/IngredientsBlock";
import SwiperBlock from "../../shared/swiper-block/SwiperBlock"

const CocktailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cocktail, setCocktail] = useState<ICocktail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);

  useEffect(() => {
    const getDrink = async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getDrinkAction(id);
        setCocktail(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getDrink(id);
    }
  }, [id]);

  useEffect(() => {
    const getIngredients = async (cocktail: ICocktail) => {
      try {
        const data = await getIngredientsCocktail(cocktail);
        setIngredients(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    if (cocktail) {
      getIngredients(cocktail);
    }
  }, [cocktail]);

  return (
    <div className="cocktail">
      <div className="container">
        <NavLink to="/" className="cocktail__back-link">
          ← Back to Cocktails
        </NavLink>
        {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="errorVariant">{error}</MessageBox>
        ) : cocktail ? (
          <div className="cocktail__inner">
            <h1 className="cocktail__title">Cocktail: {cocktail.strDrink}</h1>
            <div className="cocktail__top">
              <div className="cocktail__top-left">
                <SwiperBlock cocktailImage={cocktail.strDrinkThumb} ingredientsImages={ingredients} />
              </div>
              <div className="cocktail__top-right">
                <h2 className="cocktail__top-right-title">Ingredients</h2>
                <IngredientsBlock ingredients={ingredients} />
              </div>
            </div>
            <ul className="cocktail__bottom">
              <li className="cocktail__bottom-item">
                Category: {cocktail.strCategory}
                <li className="cocktail__bottom-item">
                  Alcoholic {cocktail.strAlcoholic}
                </li>
                <li className="cocktail__bottom-item">
                  Glass: {cocktail.strGlass}
                </li>
                <li className="cocktail__bottom-item">
                  Instructions: {cocktail.strInstructions}
                </li>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CocktailPage;
