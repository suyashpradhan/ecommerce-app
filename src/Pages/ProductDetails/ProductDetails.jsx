import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import starIcon from "../../assets/images/star.svg";
import "./ProductDetails.css";
import { Link } from "react-router-dom";
import { Product } from "../../components/ProductsListing/Product";
import { AiFillHome } from "react-icons/ai";
import { AddToWishlist } from "../../components/Wishlist/AddToWishlist";
import { AddToBag } from "../../components/Bag/AddToBag";
import { products } from "../../API/URL";
import Loader from "react-loader-spinner";
import { useStateContext } from "../../context";

export const ProductDetails = () => {
  const {
    state: { itemsInBag },
  } = useStateContext();
  const [product, setProduct] = useState({});
  const [loader, setLoader] = useState(false);

  const { _id } = useParams();

  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        const response = await axios.get(`${products}/${_id}`);
        setProduct(response.data);
        setLoader(false);
      } catch (error) {
        console.error(error);
        setLoader(false);
      }
    })();
  }, []);

  return loader ? (
    <div className="loaderRow">
      <Loader type="Oval" color="#0c6ff9" height={80} width={80} />
    </div>
  ) : (
    <div className="wrapper-fluid">
      <Link to="/products" element={<Product />}>
        <AiFillHome className="productDetailsIcon" />
      </Link>

      <div className="row mT2">
        <div className="xl-7 lg-7 md-12 sm-12 ">
          <div className="productLeftWrapper">
            <img
              src={product.image}
              alt={product.name}
              className="productDetailsImage"
            />
          </div>
        </div>
        <div className="xl-5 lg-5 md-12 sm-12">
          <div className="productRightWrapper">
            <h1 className="productDetailsTitle">{product.name}</h1>
            <h1 className="productDetailsBrandName">{product.brand}</h1>
            <span className="productRating">
              {product.ratings} / 5.0
              <img src={starIcon} alt="ratings" className="cardIcon-sm"></img>
            </span>
            <p className="productDummyDescription">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              tempore, vel fuga voluptatibus consectetur nesciunt repudiandae
              nulla maxime laborum officia corporis at, nisi nobis ea obcaecati
              ipsam, deserunt reiciendis laudantium!
            </p>
            <h3 className="productPrice pB2">Rs {product.discountedPrice}</h3>
            <h4 className="actualPrice">Rs {product.originalPrice}</h4>
            <h4 className="offer">{product.discount} % </h4>

            <div className="cardFooter block">
              <AddToBag key={product._id} product={product} />
              <AddToWishlist key={product._id} product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
