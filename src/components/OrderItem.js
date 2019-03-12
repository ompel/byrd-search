import React from "react";
import "./OrderItem.css";

const OrderItem = ({ name, quantity, total_price }) => {
  return (
    <div className="order-item">
      <div>{`x${quantity} ${name}`}</div>
      <div>{`${total_price.amount} ${total_price.currency}`}</div>
    </div>
  );
};

export default OrderItem;
