import { ICocktail } from "../../entities/cocktails/types/cocktailsTypes";

export interface FormDrinkCreateProps {
    setModalOpenCreate: React.Dispatch<React.SetStateAction<boolean>>;
    drinkDataAssets: ICocktail[];
    setErrorBox?: (message: string) => void;
    setDrinkDataAssets: React.Dispatch<React.SetStateAction<ICocktail[]>>;
    setMessageBoxVariant: React.Dispatch<React.SetStateAction<string>>;
}
