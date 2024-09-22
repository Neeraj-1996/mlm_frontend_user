// src/components/ImageSlider/ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
// import './ImageSlider.css'; // Create this CSS file for styling
import './Slider.css'
// Slider settings
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,         
    autoplaySpeed: 10000, 
};

const ImageSlider = ({ imageUrls }) => {
  return (
    <div className="slider-container">
      <Slider {...sliderSettings}>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <img src={url} alt={`Slide ${index}`} className="slider-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
