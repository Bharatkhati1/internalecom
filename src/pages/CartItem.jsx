import React, {useState, useEffect} from "react";
import ProductImg2 from "../assets/images/product-img-2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { putecomData } from "../Services/ecomapiServices";
const CartItem = ({item, userId, onDelete, onUpdateQuantity}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQuantity = async (newQuantity) => {
    try {
      const response = await putecomData("/cart/update", {
        userId,
        products: [{ productId: item._id, quantity: newQuantity }],
      });
      if (response.data.status) {
        setQuantity(newQuantity);
      }
      onUpdateQuantity();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  return (
    <li>
      <div className="CartListLeft">
        <figure>
          <img src={ProductImg2} />
        </figure>
        <figcaption className="mt-2">
          <h4 className="mb-3">{item.name}</h4>
          <div class="price-tag mb-3">
            <p>
              ${item.price} <del>${item.price}</del>
            </p>
          </div>
          <span
            class="input-number-decrement SmallCart"
            onClick={() => quantity > 1 && updateQuantity(quantity - 1)}
          >
            –
          </span>
          <input
            value={quantity}
            class="input-number"
            type="text"
            min="0"
            max="10"
          />
          <span
            class="input-number-increment"
            onClick={() => updateQuantity(quantity + 1)}
          >
            +
          </span>
        </figcaption>
      </div>
      <div className="ActionMain">
        <a className="edit-icon action-box">
          <FontAwesomeIcon icon={faPenToSquare} />
        </a>
        <a
          className="delete-icon action-box"
          onClick={() => onDelete(item._id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </a>
      </div>
    </li>
  );
};

export default CartItem;
