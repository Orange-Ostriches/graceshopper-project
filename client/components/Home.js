import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFeatProducts } from "../store/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * COMPONENT
 */
export const Home = () => {
  const { products } = useSelector((state) => state);
  const [mainProduct, setMainProduct] = useState({});
  const [slideNumber, setSlideNumber] = useState(0);
  const dispatch = useDispatch();

  const SLIDES = [
    { image: "/images/toTheStars.jpg", text: "Take to the stars!" },
    { image: "/images/luxury.jpg", text: "Travel in style!" },
    {
      image: mainProduct.image,
      text: mainProduct.name,
      id: "main-prod-img",
      link: `/products/${mainProduct.id}`,
    },
    {
      image: "/images/orangeOstrich.jpg",
      text: "Trust the galactic leader in personal space travel.",
    },
  ];

  const selectSlide = (i) => {
    if (i < 0) setSlideNumber(SLIDES.length - 1);
    // wrap to end;
    else if (SLIDES.length <= i) setSlideNumber(0);
    // wrap to start
    else setSlideNumber(i);
  };

  const previous = () => {
    selectSlide(slideNumber - 1);
  };
  const next = () => {
    selectSlide(slideNumber + 1);
  };

  useEffect(() => {
    const interval = setInterval(selectSlide, 4000, slideNumber + 1);
    return () => clearInterval(interval);
  }, [slideNumber]);

  useEffect(() => {
    dispatch(fetchFeatProducts());
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setMainProduct(products[0]);
    }
  }, [products]);

  return (
    <div className="content">
      {Object.keys(mainProduct).length === 0 ? (
        <h1 className="title">Loading...</h1>
      ) : (
        <div className="main">
          <h1 className="title">Orange Ostriches SpaceCo</h1>

          <div id="carousel-main" className="slideshow-container">
            {SLIDES.map((slide, i) => {
              const active = i === slideNumber;

              if (!active) return null; // this isn't the active slide so we're not going to show it

              const { image, text, id, link } = slide;

              const imageTag = (
                <img
                  id={id}
                  src={image}
                  style={{ width: "100%", height: "800px" }}
                />
              );

              return (
                <div key={text} className="slide">
                  {link ? <Link to={link}>{imageTag}</Link> : imageTag}
                  <div className="slide-text">{text}</div>
                </div>
              );
            })}

            <a className="slide-prev" onClick={previous}>
              <FontAwesomeIcon icon={["fad", "chevron-double-left"]} />
            </a>
            <a className="slide-next" onClick={next}>
              <FontAwesomeIcon icon={["fad", "chevron-double-right"]} />
            </a>
          </div>
          <br />

          <div style={{ textAlign: "center" }}>
            {SLIDES.map((slide, i) => {
              const active = i === slideNumber;

              return (
                <span
                  key={slide.text}
                  className={`slide-dot ${active ? "active" : ""}`}
                  onClick={() => selectSlide(i)}
                  id={`slide-dot-${i + 1}`}
                />
              );
            })}
          </div>

          <div id="carousel">
            {products.map((product) => (
              <div key={product.id} id="product">
                <img
                  className="prod-img"
                  src={product.image}
                  onClick={() => setMainProduct(product)}
                />
                <h3>{product.name}</h3>
                <h4>Price: {product.price}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
