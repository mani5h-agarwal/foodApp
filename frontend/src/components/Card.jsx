import PropTypes from "prop-types";

const Card = ({ item, cart, onAddToCart, onIncrease, onDecrease, onClick }) => {
  return (
    <div className="col-md-4" >  {/* Add onClick to trigger modal */}
      <div className="card mb-4">
        <div className="card-body">
          <img
            src={item.imageURL}
            alt={item.name}
            className="img-fluid mb-4"
            onClick={onClick}
          />
          <h5 className="card-title">{item.name}</h5>
          {/* <p className="card-text">{item.description}</p> */}
          <p className="card-text">
            <strong>Price: ${item.price}</strong>
          </p>
          {cart[String(item.id)] ? (
            <div className="d-flex align-items-center">
              <button
                className="btn btn-secondary me-2"
                onClick={() => onDecrease(item.id)}
              >
                -
              </button>
              <span>{cart[String(item.id)].quantity}</span>
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
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,  // onClick handler for opening modal
};

export default Card;