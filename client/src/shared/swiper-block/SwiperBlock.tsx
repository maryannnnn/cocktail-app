import './swiper-block.scss'
import React, { useRef, useState, useEffect, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { IIngredient } from "../../entities/ingredients/types/ingredientTypes";

interface SwiperBlockProps {
    cocktailImage: string;
    ingredientsImages: IIngredient[];
}

const SwiperBlock: FC<SwiperBlockProps> = ({ cocktailImage, ingredientsImages }) => {

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const imgArray = [cocktailImage];
        ingredientsImages.forEach((item) => {
            imgArray.push(item.ingredientUrlImage);
        });
        setImages(imgArray);
    }, [cocktailImage, ingredientsImages]);

    return (
        <div className='swiper-block'>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {images.length > 0 && (
                    images.map((image, index) => (
                        <SwiperSlide>
                            <img className='' src={image} key={index} />
                        </SwiperSlide>
                    )))
                }
            </Swiper>
        </div>
    );
}

export default SwiperBlock
