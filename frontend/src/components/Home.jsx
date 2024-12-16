import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { addToCart, increaseQuantity, decreaseQuantity } from "../utils/handleCart";
import Card from "./Card";  // Import the reusable Card component
import ItemModal from "./ItemModal";  // Import the ItemModal component

const Home = ({ user }) => {
  const [allItems, setAllItems] = useState(
    JSON.parse(localStorage.getItem("allItems")) || []
  );
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || {}
  );
  const [selectedItem, setSelectedItem] = useState(null);  // Track selected item for modal
  const [isModalOpen, setIsModalOpen] = useState(false);  // Track modal visibility
  const [isBackgroundBlurred, setIsBackgroundBlurred] = useState(false);  // Track blur effect

  // Fetch items data from the API if not already in localStorage
  useEffect(() => {
    if (allItems.length === 0) {
      fetch("/api/itemsData")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setAllItems(data);
          localStorage.setItem("allItems", JSON.stringify(data || []));
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [allItems]);

  // Handle card click to open modal
  const handleCardClick = (item) => {
    setSelectedItem(item);  // Set the selected item for modal display
    setIsModalOpen(true);    // Open the modal
    setIsBackgroundBlurred(true); // Apply blur effect to the background
  };

  // Handle modal close action
  const handleCloseModal = () => {
    setIsModalOpen(false);  // Close the modal
    setIsBackgroundBlurred(false);  // Remove the blur effect
  };

  return (
    <div className="container mt-5">
      <div className={`row ${isBackgroundBlurred ? "blur-background" : ""}`}>
        <h1 className="mb-4 text-center">Home</h1>
        {allItems.length > 0 ? (
          allItems.map((item, index) => (
            <Card
              key={index}
              item={item}
              cart={cart}
              onAddToCart={(item) => addToCart(user, item, setCart)}  // Add item to the cart
              onIncrease={(itemId) => increaseQuantity(user, itemId, setCart)}  // Increase item quantity
              onDecrease={(itemId) => decreaseQuantity(user, itemId, setCart)}  // Decrease item quantity
              onClick={() => handleCardClick(item)}  // Handle click to open modal
            />
          ))
        ) : (
          <p>No items to display</p>
        )}
      </div>

      {/* Item Modal */}
      <ItemModal 
        item={selectedItem} 
        isOpen={isModalOpen} 
        toggle={handleCloseModal}  // Pass function to close the modal
        cart={cart} 
        onAddToCart={(item) => addToCart(user, item, setCart)}  // Add to cart from modal
        onIncrease={(itemId) => increaseQuantity(user, itemId, setCart)}  // Increase quantity from modal
        onDecrease={(itemId) => decreaseQuantity(user, itemId, setCart)}  // Decrease quantity from modal
      />
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,  // Ensure that 'user' prop contains data
};

export default Home;