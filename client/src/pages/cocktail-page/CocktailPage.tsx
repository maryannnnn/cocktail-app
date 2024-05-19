import './cocktail-page.scss'
import './media.scss'
import React, { useEffect, useState, FC } from 'react';
import {useParams, NavLink} from 'react-router-dom';
import axios from 'axios';
import { ICocktail } from '../../entities/cocktails/types/cocktailsTypes';

const CocktailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [cocktail, setCocktail] = useState<ICocktail | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCocktail = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = response.data.drinks[0];
                setCocktail(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCocktail();
    }, [id]);

    return (
        <div className="cocktail">
            <NavLink to="/" className="back-link">← Back to Cocktails</NavLink>
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : cocktail ? (
                <div className="cocktail_content">
                    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail__image" />
                    <h1 className="cocktail__title">{cocktail.strDrink}</h1>
                    <p><strong>Category:</strong> {cocktail.strCategory}</p>
                    <p><strong>Glass:</strong> {cocktail.strGlass}</p>
                    <p><strong>Instructions:</strong> {cocktail.strInstructions}</p>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        {/*{Array.from({ length: 15 }).map((_, index) => {*/}
                        {/*    const ingredient = cocktail[`strIngredient${index + 1}` as keyof ICocktail];*/}
                        {/*    const measure = cocktail[`strMeasure${index + 1}` as keyof ICocktail];*/}
                        {/*    return ingredient ? (*/}
                        {/*        <div key={index}>*/}
                        {/*            {measure ? `${measure} of ` : ''}{ingredient}*/}
                        {/*        </div>*/}
                        {/*    ) : null;*/}
                        {/*})}*/}
                    </ul>
                </div>
            ) : (
                <div>No cocktail found</div>
            )}
        </div>
    );
};
export default CocktailPage
