import React from 'react';

const ServiceBar = () => {
  const services = [
    { 
      img: '/images/freeshipping.png', 
      title: 'FREE Delivery', 
      desc: 'On all Orders' 
    },
    { 
      img: '/images/7dayseasyreturn.png', 
      title: '7 days', 
      desc: 'Easy Returns' 
    },
    { 
      img: '/images/greatquality.png', 
      title: 'Great Quality at', 
      desc: 'Best Prices' 
    }
  ];

  return (
    <section className="service-container">
      <div className="service-box">
        {services.map((s, i) => (
          <div key={i} className="service-item">
            <img src={s.img} alt={s.title} width="70" height="70" />
            <div className="service-info">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceBar;
