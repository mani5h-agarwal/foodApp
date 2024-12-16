import { useState } from "react";
import PropTypes from "prop-types";
import { increaseQuantity, decreaseQuantity } from "../utils/handleCart";
import Card from "./Card";  // Reuse the Card component
import ItemModal from "./ItemModal";  // Reuse the ItemModal component

const Cart = ({ user }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || {}
  );
  const [selectedItem, setSelectedItem] = useState(null);  // Track selected item
  const [isModalOpen, setIsModalOpen] = useState(false);  // Track modal visibility
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);  // Track blur effect

  const calculateTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);  // Set selected item for the modal
    setIsModalOpen(true);    // Open the modal
    setIsBackgroundBlurred(true); // Add blur effect to the background
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);  // Close the modal
    setIsBackgroundBlurred(false);  // Remove the blur effect
  };

  return (
    <div className="container mt-5">
      <div className={`row ${isBackgroundBlurred ? "blur-background" : ""}`}>
        <h1>Your Cart</h1>
        <div className="row">
          {Object.values(cart).length > 0 ? (
            Object.values(cart).map((item, index) => (
              <Card
                key={index}
                item={item}
                cart={cart}
                // onAddToCart={() => addToCart(user, item, setCart)}
                onIncrease={() => increaseQuantity(user, item.id, setCart)}
                onDecrease={() => decreaseQuantity(user, item.id, setCart)}
                onClick={() => handleCardClick(item)}  // Handle card click to open the modal
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="mt-4">
          <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
        </div>
      </div>

      <ItemModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        toggle={handleCloseModal}  // Pass toggle function to close the modal
        cart={cart}
        onIncrease={(id) => increaseQuantity(user, id, setCart)}
        onDecrease={(id) => decreaseQuantity(user, id, setCart)}
      />
    </div>
  );
};

Cart.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Cart;