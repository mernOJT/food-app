import React from "react";
import "./style.css";
import homeslider from "./home_slider.png";
import { useNavigate, useParams } from "react-router";
import Footer from "../Footer";

type CartDataType = {
  id: string;
  title: string;
  foodImage?: string;
  price: number;
  quantity: number;
};

const Cart = () => {
// const Cart = ({ cartItem }: CartProps) => {
//  const {id, title, foodImage, price, quantity} = cartItem;


  // const { id } = useParams();
  const [allCartItem, setAllCartItem] = React.useState<CartDataType[]>([]);
  const navigate = useNavigate();

  // const cartProducts: CartDataType = {
  //   id:  cartItem.id,
  //   title: String(title),
  //   price: Number(price),
  //   quantity: quantity,
  // };
  //  setAllCartItem((prevState): CartDataType[] => [...prevState, cartProducts]);
  //  console.log(allCartItem);

  // const handleAddToCart = () => {
  //   const cartProducts: CartDataType = {
  //     foodId: String(foodItem?.id),
  //     foodTitle: String(foodItem?.title),
  //     price: Number(foodItem?.price),
  //     quantity: itemQuantity,
  //   };
  //   setCartItem((prevState): CartDataType[] => [...prevState, cartProducts]);
  // };

    // const cartStr = localStorage.getItem("cart");
    // if (cartStr) {
    //   const cart: CartDataType[] = JSON.parse(cartStr);
    //   if (cart.length > 0) {
    //       setAllCartItem((prevState): any => [...prevState, cart]);

    //     console.log("1st Cart quantity: ", cart[0].quantity);
    //     console.log("2nd Cart quantity: ", cart[1]?.quantity);
    //     console.log(
    //       "Two Cart price: ",
    //       cart[0].quantity * cart[0].price + cart[1]?.quantity * cart[1]?.price
    //     );
    //   }
    // }

    console.log("cart: ", allCartItem);
  const handleCheckoutSubmit = () => {
    alert("We have received your order. Thanks for order !");
    navigate("/");
  };
  return (
    <React.Fragment>
      <div className="cart" style={{ background: `url(${homeslider})` }}>
        <div className="cart__row">
          <h2 className="cart__title">Cart</h2>
          <table className="cart__table">
            <tr>
              <th className="cart__table__header">Sl No</th>
              <th className="cart__table__header">Image</th>
              <th className="cart__table__header">Product Name</th>
              <th className="cart__table__header">Quantity</th>
              <th className="cart__table__header">Price</th>
              <th className="cart__table__header">Action</th>
            </tr>
            {allCartItem?.map((cart, index) => (
              <tbody>
                <tr>
                  {/* <td className="cart__table__field">{index + 1}</td> */}
                  <td className="cart__table__field">1</td>
                  {/* <td className="cart__table__field">products images</td> */}
                  <td className="cart__table__field">
                    <img
                      src="https://gangnam88.net/wp-content/uploads/2021/03/icon-bibimbap.png"
                      alt="Food Images"
                      height="50px"
                      width="50px"
                    />
                  </td>
                  <td className="cart__table__field">
                    {cart?.title}
                    Name
                  </td>
                  <td className="cart__table__field">1</td>
                  <td className="cart__table__field">199</td>
                  <td className="cart__table__field">
                    <button className="cart__table__deleteButton">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className="cart__checkout">
            <button
              onClick={handleCheckoutSubmit}
              className="cart__checkoutButton"
            >
              Process to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Cart;