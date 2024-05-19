import './cocktails.scss';
import './media.scss';
import React, {useEffect, FC, useState} from "react";
import DrinkCard from "../../widgets/drink-card/DrinkCard";
import {getCocktailsAction} from "../../entities/cocktails/actions/cocktailActions";
import {ICocktail} from "../../entities/cocktails/types/cocktailsTypes";
import {MessageBox, LoadingBox} from '../../shared/box/boxes';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Grid, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import AlphabetPagination from '../../shared//alphabet-pagination/AlphabetPagination';

const Cocktails: FC = () => {
    const [cocktails, setCocktails] = useState<ICocktail[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLetter, setSelectedLetter] = useState<string>('A');

    useEffect(() => {
        const getCocktails = async (letter: string) => {
            setIsLoading(true);
            setError(null);

            try {
                const data = await getCocktailsAction(letter);
                setCocktails(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        getCocktails(selectedLetter);
    }, [selectedLetter]);

    const handleSelectLetter = (letter: string) => {
        setSelectedLetter(letter);
    };

    return (
        <div className="cocktails">
            <div className="container">
                <h1 className="cocktails__title">Browse Cocktails</h1>
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
                                <LoadingBox/>
                            ) : error ? (
                                <MessageBox variant="errorVariant">{error}</MessageBox>
                            ) : cocktails.length > 0 ? (
                                cocktails.map((drink) => (
                                    <SwiperSlide>
                                            <DrinkCard key={drink.idDrink} drink={drink}/>
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
    );
}

export default Cocktails;
