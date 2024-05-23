import './cocktails.scss';
import './media.scss';
import React, { useEffect, FC, useState } from "react";
import drinksData from '../../app/assets/drinks/drinks.json';
import DrinkCard from "../../widgets/drink-card/DrinkCard";
import { getCocktailsAction } from "../../entities/cocktails/actions/cocktailActions";
import { ICocktail } from "../../entities/cocktails/types/cocktailsTypes";
import { MessageBox, LoadingBox } from '../../shared/box/boxes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import AlphabetPagination from '../../shared//alphabet-pagination/AlphabetPagination';
import Button from "../../shared/btn/Button";
import Modal from '../../shared/modal/Modal';
import FormDrinkCreate from '../../features/form-drink-create/FormDrinkCreate';

const Cocktails: FC = () => {
    const [cocktails, setCocktails] = useState<ICocktail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string>('A');
    const [modalOpenCreate, setModalOpenCreate] = useState<boolean>(false);
    const [formCocktails, setFormCocktails] = useState(cocktails as ICocktail[]);
    const [massageBoxVariant, setMessageBoxVariant] = useState<string>('')
    const [drinkDataAssets, setDrinkDataAssets] = useState<ICocktail[]>([])

    useEffect(() => {
        const getCocktails = async (letter: string, drinkDataAssets: ICocktail[]) => {
            setIsLoading(true);
            setError(null);

            try {
                const data: ICocktail[] = await getCocktailsAction(letter);
                const getDrinkDataAssets = drinksData
                    .filter(item => item.strDrink.charAt(0).toLowerCase() === letter.toLowerCase())
                    .map((drink) => ({
                        ...drink,
                        dateModified: new Date(drink.dateModified)
                    }));

                setDrinkDataAssets(getDrinkDataAssets)

                const combinedData: ICocktail[] = [...drinkDataAssets, ...data];
                setCocktails(combinedData);
                console.log("combine Data", combinedData);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        getCocktails(selectedLetter, drinkDataAssets);
    }, [selectedLetter]);

    const handleSelectLetter = (letter: string) => {
        setSelectedLetter(letter);
    };

    const handleModalCreateOpen = () => {
        setModalOpenCreate(true)
    }

    return (
        <>
            <div className="cocktails">
                <div className="container">
                    <h1 className="cocktails__title">Browse Cocktails</h1>
                    <Button className="button" onClick={handleModalCreateOpen} >Add Drink</Button>
                    <AlphabetPagination onSelectLetter={handleSelectLetter} />
                    <div className="cocktails__inner">
                        <div className="cocktails__inner-main">
                            <Swiper
                                slidesPerView={4}
                                grid={{
                                    rows: 2,
                                }}
                                spaceBetween={10}
                                pagination={{
                                    clickable: true,
                                }}
                                modules={[Grid, Pagination]}
                                className="mySwiper"
                            >
                                {isLoading ? (
                                    <LoadingBox />
                                ) : error ? (
                                    <MessageBox variant="errorVariant">{error}</MessageBox>
                                ) : cocktails.length > 0 ? (
                                    cocktails.map((drink) => (
                                        <SwiperSlide>
                                            <DrinkCard key={drink.idDrink} drink={drink} />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <div>No cocktails found</div>
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            <Modal modalOpen={modalOpenCreate} setModalOpen={setModalOpenCreate}>
                <FormDrinkCreate
                    setModalOpenCreate={setModalOpenCreate}
                    drinkDataAssets={drinkDataAssets}
                    setDrinkDataAssets={setDrinkDataAssets}
                    setErrorBox={setError}
                    setMessageBoxVariant={setMessageBoxVariant}
                />
            </Modal>
            {massageBoxVariant === 'errorVariant' && error ? (
                <MessageBox variant={massageBoxVariant}>{error}</MessageBox>
            ) : (massageBoxVariant === 'successVariant') ? (
                <MessageBox variant={massageBoxVariant}>Seccesseful</MessageBox>
            ) : (<div></div>)}
        </>
    );
}

export default Cocktails;
