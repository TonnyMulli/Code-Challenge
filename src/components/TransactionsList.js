import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions, onDelete }) {
  return (
    <table className="ui celled striped padded table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;