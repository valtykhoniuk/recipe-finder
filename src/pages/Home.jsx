import React from "react";
import ReceiptCard from "../components/ReceiptCard";

const Home = () => {
  const exampleReceipt1 = {
    name: "Borsch",
    calories: "500",
    desc: "Description is here...",
  };

  const exampleReceipt2 = {
    name: "Zupa",
    calories: "600",
    desc: "Description is here...",
  };

  const receiptArray = [exampleReceipt1, exampleReceipt2];

  return (
    <div className="cards__container">
      {receiptArray.map((receipt) => (
        <ReceiptCard
          key={receipt.name}
          name={receipt.name}
          calories={receipt.calories}
          desc={receipt.desc}
        />
      ))}
    </div>
  );
};

export default Home;
