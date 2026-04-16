import React, { useState, useEffect, useRef } from 'react';

const Carousel = ({ isFocusMode, setIsFocusMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { img: '/images/crausel 3.jpg', alt: 'Banner 1' },
    { img: '/images/crausel 4.jpg', alt: 'Banner 2' },
    { img: '/images/crausel 1.jpg', alt: 'Banner 3' },
    { img: '/images/crausel 5.jpg', alt: 'Banner 4' },
    { img: '/images/crausel 2.jpg', alt: 'Banner 5' }
  ];

  const timerRef = useRef(null);

  const startTimer = () => {
    if (isFocusMode) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [isFocusMode]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleFocusMode = () => {
    if (!isFocusMode) {
      setIsFocusMode(true);
      stopTimer();
    }
  };

  const closeFocusMode = (e) => {
    e.stopPropagation();
    setIsFocusMode(false);
    startTimer();
  };

  return (
    <section className="banner-slider">
      <div className="carousel" onClick={handleFocusMode}>
        <div className="slides">
          {slides.map((slide, i) => (
            <div key={i} className={`slide-link ${currentIndex === i ? 'active' : ''}`}>
              <img src={slide.img} className="slide" alt={slide.alt} />
            </div>
          ))}
        </div>

        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>

        <div className="banner-indicators">
          {slides.map((_, i) => (
            <span 
              key={i} 
              className={`dot ${currentIndex === i ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); goToSlide(i); }}
            ></span>
          ))}
        </div>

        {isFocusMode && (
          <button className="close-focus-mode" onClick={closeFocusMode}>
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </section>
  );
};

export default Carousel;
