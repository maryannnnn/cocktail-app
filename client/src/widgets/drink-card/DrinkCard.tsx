import './drink-card.scss'
import './media.scss'
import React, {FC} from 'react';
import {ICocktail} from "../../entities/cocktails/types/cocktailsTypes";
import {NavLink} from "react-router-dom";

interface PropsDrinkCard {
    drink: ICocktail;
}
const DrinkCard: FC<PropsDrinkCard> = ({drink}) => {

    return (
        <NavLink className="link" to={`/drink/${drink.idDrink}`}>
        <div className="drink-card">
            <img src={drink.strDrinkThumb} alt={drink.strDrink} className="drink-card__image" />
            <div className="drink-card__content">
                <div className="drink-card__title">{drink.strDrink}</div>
            </div>
        </div>
        </NavLink>
    );
}

export default DrinkCard