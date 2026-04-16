import React, { useRef } from 'react';

const ShowcaseSection = ({ id, title, badge, type, onProductClick, products = [] }) => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const scrollAmount = 600;
    trackRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className={`showcase-section ${type === 'trending' ? 'showcase-section-alt' : ''}`} id={id}>
      <h2 className="showcase-title">{title}</h2>
      <div className="showcase-scroll-wrapper">
        <button className="showcase-arrow showcase-arrow-left" onClick={() => scroll('left')}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="showcase-track" ref={trackRef}>
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`showcase-card ${type === 'trending' ? 'showcase-card-trending' : type === 'budget' ? 'showcase-card-budget' : ''}`}
              onClick={() => onProductClick(p)}
            >
              <span className={`showcase-badge ${type === 'trending' ? 'trending-badge' : type === 'budget' ? 'budget-badge' : ''}`}>
                {badge}
              </span>
              <div className="showcase-card-img">
                <img src={p.img} alt={p.name} />
              </div>
              <div className="showcase-card-info">
                <span className="showcase-card-name">{p.name}</span>
                {type === 'trending' ? (
                  <>
                    <span className="showcase-card-price-row">
                      <span className="showcase-sale-price">{p.salePrice}</span> 
                      <del className="showcase-mrp">{p.mrp}</del>
                    </span>
                    <span className="showcase-discount-tag">{p.discount}</span>
                  </>
                ) : type === 'budget' ? (
                  <>
                    <span className="showcase-card-price-row">
                      <span className="showcase-sale-price">{p.salePrice}</span> 
                      <del className="showcase-mrp">{p.mrp}</del>
                    </span>
                    <span className="showcase-stars">
                      <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i> <small>{p.rating}</small>
                    </span>
                  </>
                ) : (
                  <span className="showcase-card-price">{p.price}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="showcase-arrow showcase-arrow-right" onClick={() => scroll('right')}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
};

export default ShowcaseSection;
