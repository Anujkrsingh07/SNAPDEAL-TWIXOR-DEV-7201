import React from 'react';

const categories = [
  {
    name: "Men's Fashion",
    icon: "/images/mens-fashion-icon.png",
    columns: [
      {
        title: "Clothing",
        items: ["T-Shirts", "Shirts", "Jeans"]
      },
      {
        title: "Footwear",
        items: ["Sports Shoes", "Casual Shoes", "Slippers"]
      }
    ],
    picks: [
      { name: "Denim Jeans", img: "/images/jeans.jpg", price: "₹999", mrp: "₹2,499", discount: "70% OFF" },
      { name: "Cotton T-Shirt", img: "/images/tshirt.jpg", price: "₹449", mrp: "₹1,199", discount: "63% OFF" },
      { name: "Sports Shoes", img: "/images/shoes.jpg", price: "₹1,299", mrp: "₹3,499", discount: "63% OFF" }
    ]
  },
  {
    name: "Women's Fashion",
    icon: "/images/womens-fashion-icon.png",
    columns: [
      {
        title: "Ethnic Wear",
        items: ["Sarees", "Kurtas", "Salwar Suits"]
      },
      {
        title: "Western Wear",
        items: ["Dresses", "Tops", "Trousers"]
      }
    ],
    picks: [
      { name: "Banarasi Saree", img: "/images/saree.jpg", price: "₹1,299", mrp: "₹3,499", discount: "63% OFF" },
      { name: "Makeup Kit", img: "/images/cosmetic.jpg", price: "₹299", mrp: "₹799", discount: "63% OFF" },
      { name: "Designer Sunglasses", img: "/images/sunglasses.jpg", price: "₹349", mrp: "₹899", discount: "61% OFF" }
    ]
  },
  {
    name: "Home & Kitchen",
    icon: "/images/home-kitchen-icon.png",
    columns: [
      {
        title: "Kitchen",
        items: ["Cookware", "Appliances", "Dining"]
      },
      {
        title: "Home Decor",
        items: ["Curtains", "Cushions", "Wall Decor"]
      }
    ],
    picks: [
      { name: "Non-Stick Cookware", img: "/images/cookware.jpg", price: "₹1,499", mrp: "₹3,999", discount: "63% OFF" },
      { name: "Steel Kadai", img: "/images/steelkadhai.webp", price: "₹799", mrp: "₹1,999", discount: "60% OFF" },
      { name: "Induction Cooktop", img: "/images/induction.png", price: "₹2,199", mrp: "₹4,999", discount: "56% OFF" }
    ]
  },
  {
    name: "Electronics",
    icon: "/images/electronics-icon.png",
    columns: [
      {
        title: "Mobiles",
        items: ["Smartphones", "Accessories"]
      },
      {
        title: "Computers",
        items: ["Laptops", "Printers"]
      },
      {
        title: "Audio",
        items: ["Headphones", "Earbuds"]
      }
    ],
    picks: [
      { name: "Smartphone 5G", img: "/images/smartphone.jpg", price: "₹9,999", mrp: "₹19,999", discount: "50% OFF" },
      { name: "Wireless Headphones", img: "/images/wirelessheadphone.jpg", price: "₹2,499", mrp: "₹5,999", discount: "58% OFF" },
      { name: "Bluetooth Earbuds", img: "/images/bluetoothearbud.jpg", price: "₹1,299", mrp: "₹3,499", discount: "63% OFF" }
    ]
  },
  {
    name: "Beauty & Health",
    icon: "/images/beauty-health-icon.png",
    columns: [
      {
        title: "Beauty",
        items: ["Makeup", "Skincare", "Haircare"]
      },
      {
        title: "Health",
        items: ["Supplements", "Devices"]
      }
    ],
    picks: [
      { name: "Premium Makeup Kit", img: "/images/makeupkit.jpg", price: "₹599", mrp: "₹1,499", discount: "60% OFF" },
      { name: "Vitamin C Serum", img: "/images/vitamincserum.png", price: "₹299", mrp: "₹799", discount: "63% OFF" },
      { name: "Sunscreen SPF 50+", img: "/images/sunscreenspf50.jpg", price: "₹199", mrp: "₹499", discount: "60% OFF" }
    ]
  }
];

const Navbar = () => {
  return (
    <nav className="category-nav">
      <div className="container">
        <ul className="nav-links">
          {categories.map((cat, i) => (
            <li key={i} className="nav-item">
              <a href="#">
                <img src={cat.icon} alt={cat.name} className="nav-cat-icon" />
                {cat.name} <i className="fas fa-chevron-down"></i>
              </a>
              <div className="dropdown-menu">
                <div className="dropdown-content">
                  <div className="column">
                    {cat.columns.map((col, j) => (
                      <React.Fragment key={j}>
                        <h4>{col.title}</h4>
                        {col.items.map((item, k) => (
                          <a key={k} href="#">{item}</a>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="dd-products">
                    <h4 className="dd-products-title">Popular Picks</h4>
                    <div className="dd-product-list">
                      {cat.picks.map((pick, j) => (
                        <a key={j} href="#" className="dd-product-card">
                          <div className="dd-product-img">
                            <img src={pick.img} alt={pick.name} />
                            <span className="dd-badge">{pick.discount}</span>
                          </div>
                          <div className="dd-product-info">
                            <span className="dd-product-name">{pick.name}</span>
                            <span className="dd-product-price">{pick.price} <del>{pick.mrp}</del></span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
