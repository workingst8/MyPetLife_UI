import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './ImageSlider.module.scss';

const ImageSlider: React.FC = () => {
  const imageUrls = [
    './images/home/home.png',
    './images/home/home.png',
    './images/home/home.png',
  ];

  return (
    <div>
      <Swiper
        loop={true}
        slidesPerView={1}
        className={styles.slideMain}
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
