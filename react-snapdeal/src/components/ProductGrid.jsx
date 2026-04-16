import React, { useState, useEffect } from 'react';

const ProductGrid = ({ addToCart, onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const localDeals = [
    { title: "Graceful Saree", image: "/images/saree.jpg", discount: "MIN. 60% OFF" },
    { title: "Non-stick Cookware", image: "/images/cookware.jpg", discount: "MIN. 50% OFF" },
    { title: "Latest Smartphone", image: "/images/smartphone.jpg", discount: "UNDER ₹9999" },
    { title: "Denim Jeans", image: "/images/jeans.jpg", discount: "MIN. 70% OFF" },
    { title: "Travel Backpack", image: "/images/backpack.jpg", discount: "MIN. 50% OFF" },
    { title: "Sports Shoes", image: "/images/shoes.jpg", discount: "MIN. 60% OFF" },
    { title: "Cotton T-Shirt", image: "/images/tshirt.jpg", discount: "UNDER ₹499" },
    { title: "Stylish Sunglasses", image: "/images/sunglasses.jpg", discount: "MIN. 70% OFF" },
    { title: "Everyday Makeup", image: "/images/cosmetic.jpg", discount: "UNDER ₹299" },
    { title: "Wireless Headphones", image: "/images/headphone.jpg", discount: "MIN. 40% OFF" }
  ];

  useEffect(() => {
    const fetchApiProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const apiData = await res.json();
        
        const combined = [...localDeals];
        apiData.forEach(p => {
          combined.push({
            title: p.title,
            image: p.image,
            discount: "MIN. 50% OFF"
          });
        });

        setProducts(combined.slice(0, 10));
        setLoading(false);
      } catch (err) {
        setProducts(localDeals.slice(0, 10));
        setLoading(false);
      }
    };

    fetchApiProducts();
  }, []);

  if (loading) return <div className="loading">Loading amazing deals...</div>;

  return (
    <section className="deal-section">
      <h2 className="section-title">Deal of the Day</h2>
      <div className="deal-grid-container">
        <div className="product-grid">
          {products.map((p, i) => (
            <div key={i} className="product-card" onClick={() => onProductClick(p)}>
              <div className="product-image-container">
                <img src={p.image} alt={p.title} />
              </div>
              <div className="product-info">
                <h3 className="product-title">{p.title.length > 25 ? p.title.substring(0, 22) + '...' : p.title}</h3>
                <p className="product-discount">{p.discount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
