import React, { useState } from "react";

function ShoppingCartCounter() {
  const [quantity, setQuantity] = useState(0);

  const PRICE = 29.99;
  const DISCOUNT_RATE = 0.1;

  const subTotal = quantity * PRICE;
  const hasDiscount = quantity >= 5;
  const total = hasDiscount ? subTotal * (1 - DISCOUNT_RATE) : subTotal;

  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(0, prev - 1));
  };

  return (
    <div>
      <h1>Unit Price: ${PRICE.toFixed(2)}</h1>

      <div>
        <button onClick={decrement}>-</button>
        <span style={{ margin: "0 10px" }}>{quantity}</span>
        <button onClick={increment}>+</button>
      </div>

      {hasDiscount && <p> Discount Applied (10% OFF)</p>}

      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}

export default ShoppingCartCounter;
