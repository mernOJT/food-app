import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductsDetailsDataType } from "..";

type ProductsDetailsBottomProps = {
  sameCategoryFood: ProductsDetailsDataType[];
};

const ProductsDetailsBottom: React.FC<ProductsDetailsBottomProps> = ({
  sameCategoryFood,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "liner",
  };
  return (
    <div style={{ marginBottom: "50px" }}>
      <Slider {...settings}>
        {sameCategoryFood?.map((foods) => (
          <div>
            <Link
              style={{ textDecoration: "none", color: "gray" }}
              to={`/products-details/${foods?.id?.trim()}`}
            >
              <div className="SameCategory__card">
                <img
                  className="SameCategory__card__image"
                  src={foods?.foodImage}
                  alt="Food Images"
                />
                <div className="SameCategory__card__body">
                  <div className="SameCategory__card__body__title">
                    <h3>{foods?.title}</h3>
                  </div>
                  <div className="SameCategory__card__body__description">
                    <p>{foods?.description.slice(0, 26)}...</p>
                  </div>
                  <h2>{foods?.price} $</h2>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsDetailsBottom;
