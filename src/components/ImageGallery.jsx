import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/imageGallery.module.css'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoMdClose } from 'react-icons/io'
import { getImages as getImages } from '../firebase';
import { HiDotsVertical } from "react-icons/hi";


const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null);


  const [imageUrls, setImageUrls] = useState([]);
  const folderPath = 'images/image_gallery';

  useEffect(() => {
    const fetchData = async () => {
      const images = await getImages(folderPath);
      setImageUrls(images);
    };

    fetchData();

  }, [folderPath]);



  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };


  const Modal = ({ onClose }) => {

    const goPrev = () => {

      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % (imageUrls.length));

    }

    const goNext = () => {

      setCurrentIndex((prevIndex) => (prevIndex + 1) % (imageUrls.length));
    }

    return (
      <div className={styles.Modal}>
         <span>{currentIndex + 1} / {imageUrls.length}</span>
        <div className={styles.LeftArrow} onClick={() => goPrev()}><HiOutlineChevronLeft /></div>
        <div className={styles.RightArrow} onClick={() => goNext()}><HiOutlineChevronRight /></div>
        <img src={imageUrls[currentIndex]} alt="Image" />
       
        <div className={styles.closeButton} onClick={onClose}><IoMdClose /></div>
      </div>
    );
  };


  let images = [];
  let moreImages = '';



  if (imageUrls.length > 5) {
    images = imageUrls.slice(0, 5)
    moreImages = 'ImageGallery_Img_More'

  

  } else {
    images = imageUrls;
    moreImages = 'ImageGallery_Img_More_Hide'
  }

  return (
    <div className={styles.ImageGallery_Container}>



      {images.map((item, index) => {

        return (

          <div className={styles.ImageGallery_Img}>

            <img key={index} src={item} onClick={() => openModal(item, index)} />
          </div>

        )
      })}

    
      <div title='Zobacz więcej' style={{backgroundImage:`url(${imageUrls[5]})`}}  onClick={() => openModal(images, 5)} className={`${styles[moreImages]} ${styles.ImageGallery_Img_More_Right}`}><HiDotsVertical /></div>


      {selectedImage && (
        <Modal image={selectedImage} onClose={closeModal} />
      )}


    </div>



  )
}

export default ImageGallery