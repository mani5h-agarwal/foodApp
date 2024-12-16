export const addToCart = async (user, item, setCart) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const itemId = String(item.id);
      if (newCart[itemId]) {
        newCart[itemId].quantity += 1;
      } else {
        newCart[itemId] = { ...item, quantity: 1 };
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: String(item.id),
          price: item.price,
          quantity: 1,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
  
      const cartData = await response.json();
      console.log("Cart data:", cartData);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  
  export const increaseQuantity = async (user, itemId, setCart) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const id = String(itemId);
      if (newCart[id]) {
        newCart[id].quantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: String(itemId),
          quantity: 1,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to increase item quantity");
      }
  
      const cartData = await response.json();
      console.log("Cart data:", cartData);
    } catch (error) {
      console.error("Error increasing item quantity:", error);
    }
  };
  
  export const decreaseQuantity = async (user, itemId, setCart) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const id = String(itemId);
      if (newCart[id] && newCart[id].quantity > 1) {
        newCart[id].quantity -= 1;
      } else {
        delete newCart[id];
      }
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: String(itemId),
          quantity: -1,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to decrease item quantity");
      }
  
      const cartData = await response.json();
      console.log("Cart data:", cartData);
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };