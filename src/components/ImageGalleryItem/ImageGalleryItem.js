import { ModalImg } from "components/Modal/Modal";
import { useState } from "react";
import { ImageGalleryItemImg, ImageGalleryLi } from "./ImageGalleryItem.Styled";


export const ImageGalleryItem = ({ src, largeImageURL, tags }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

     const openModal = () => {
        setModalIsOpen(true);
    }
     const closeModal = () => {
        setModalIsOpen(false);
    }
  
         return (
            <ImageGalleryLi onClick={openModal} >
            <ImageGalleryItemImg src={src} alt={tags} />
            <ModalImg src={largeImageURL} tags={tags} modalIsOpen={modalIsOpen} closeModal={closeModal} />
            </ImageGalleryLi>
            )     
          };

    