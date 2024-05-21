import React, { useState, FC } from "react";
import './lightbox-images.scss'
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { IIngredient } from "../../entities/ingredients/types/ingredientTypes";

interface LightboxImagesProps {
  cocktailImage: string;
  ingredientsImages: IIngredient[];
}

const LightboxImages: FC<LightboxImagesProps> = ({cocktailImage, ingredientsImages}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const images = [cocktailImage];

  ingredientsImages.map((item, index )=> {
    images.push(item.ingredientUrlImage)
  })

  return (
    <div>
      <div className="gallery">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            onClick={() => {
              setPhotoIndex(index);
              setIsOpen(true);
            }}
            alt={`Gallery image ${index + 1}`}
            style={{
              width: "150px",
              height: "150px",
              cursor: "pointer",
              margin: "10px",
            }}
          />
        ))}
      </div>

      {isOpen && (
        <div className="box">
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        </div>
      )}
    </div>
  );
};

export default LightboxImages;
