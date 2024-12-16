import PropTypes from "prop-types";
import "./ItemModal.css"; // Import the CSS file for custom modal animations

const ItemModal = ({ item, isOpen, toggle, onAddToCart, onIncrease, onDecrease, cart }) => {
  if (!isOpen) return null; // Return null if the modal is not open

  const itemQuantity = cart[String(item.id)] ? cart[String(item.id)].quantity : 0;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-animate" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center w-100">{item.name}</h5>
          </div>
          <div className="modal-body">
            <img
              src={item.imageURL}
              className="img-fluid mb-4"
            />
            <p>{item.description}</p>
            <p>
              <strong>Price: ${item.price}</strong>
            </p>
            <p><strong>Calories: </strong>{item.calories}</p>
            <p><strong>Protein: </strong>{item.protein}g</p>
            <p><strong>Carbs: </strong>{item.carbs}g</p>

            {itemQuantity > 0 ? (
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => onDecrease(item.id)}
                >
                  -
                </button>
                <span>{itemQuantity}</span>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => onIncrease(item.id)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => onAddToCart(item)}
              >
                Add to Cart
              </button>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={toggle}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemModal.propTypes = {
    item: PropTypes.object, // Allow item to be null or an object
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    onAddToCart: PropTypes.func.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
  };

export default ItemModal; 