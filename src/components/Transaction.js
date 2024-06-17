import React from "react";

function Transaction({ transaction, onDelete }) {
  const { date, description, category, amount } = transaction;

  const handleDeleteClick = () => {
    if (onDelete && typeof onDelete === "function") {
      onDelete(transaction);
    } else {
      console.error("onDelete is not a function or not provided");
    }
  };

  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button onClick={handleDeleteClick}>Delete</button>
      </td>
    </tr>
  );
}

export default Transaction;
