import './ingredients-block.scss'
import './media.scss'
import { FC } from "react";
import { IIngredient } from "../../entities/ingredients/types/ingredientTypes";

interface IngredientsBlockProps {
  ingredients: IIngredient[];
}

const IngredientsBlock: FC<IngredientsBlockProps> = ({ingredients}) => {
  return (
    <ul className="ingredient">
      {ingredients.map((ingredient) => (
        <li className="ingredient__item" key={ingredient.ingredientId}>
          <img
            className="ingredient__item-img"
            src={ingredient.ingredientUrlImageSmall}
            alt={ingredient.ingredientName}
          />
          <div className="ingredient__item-name">
            {ingredient.ingredientName}:
          </div>
          <div className="ingredient__item-measure">
            {ingredient.ingredientMeasure}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsBlock;