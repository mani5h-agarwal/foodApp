const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/cart");

const router = express.Router();


router.post("/add", async (req, res) => {
  const { userId, productId, price, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    console.log("Cart:", cart);

    if (!cart) {
      if (quantity > 0) {
        const newCart = new Cart({
          userId,
          items: [{ productId, price, quantity }],
        });

        console.log("New cart:", newCart);
        await newCart.save();
        return res.status(201).json({ message: "Cart created and item added" });
      } else {
        return res
          .status(400)
          .json({ error: "Invalid quantity. Cannot create a cart." });
      }
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId
      );
      console.log("Item index:", itemIndex);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;

        if (cart.items[itemIndex].quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
      } else if (quantity > 0) {
        cart.items.push({ productId, price, quantity });
      }

      if (cart.items.length === 0) {
        await Cart.deleteOne({ userId });
        return res
          .status(200)
          .json({ message: "Cart is empty and has been removed" });
      }

      await cart.save();
      return res.status(201).json({ message: "Item added/updated in cart" });
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  console.log("User ID:", userId);

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
