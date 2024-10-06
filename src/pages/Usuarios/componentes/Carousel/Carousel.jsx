import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../../Context'
import "./carousel.css"
function Carousel() {
    const { banners } = useAppContext()
console.log(banners)
const [currentIndex, setCurrentIndex] = useState(0);

const goToNextSlide = () => {
  setCurrentIndex((prevIndex) => 
    prevIndex === banners.length - 1 ? 0 : prevIndex + 1
  );
};

const goToPrevSlide = () => {
  setCurrentIndex((prevIndex) => 
    prevIndex === 0 ? banners.length - 1 : prevIndex - 1
  );
};

// Autoplay
useEffect(() => {
  const interval = setInterval(goToNextSlide, 5000);
  return () => clearInterval(interval);
}, []);

return (
  <div className="carousel">
    <div
      className="carousel-container"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className="slide"
        >
          <img src={banner.image_urls} alt={`Banner ${index + 1}`} />
        </div>
      ))}
    </div>
    <button className="prev" onClick={goToPrevSlide}>
      &#10094;
    </button>
    <button className="next" onClick={goToNextSlide}>
      &#10095;
    </button>
  </div>
);
}


export default Carousel