import React from "react";

const ReceiptCard = ({ name, calories, desc }) => {
  return (
    <div className="receipt-card__container">
      <div className="receipt-card">
        <h3>{name}</h3>
        <h4>Calories: {calories}</h4>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default ReceiptCard;
