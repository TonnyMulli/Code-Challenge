import React, { useState, useEffect } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then(response => response.json())
      .then(data => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch(error => console.error("Error fetching transactions:", error));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = (newTransaction) => {
    fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
      .then(response => response.json())
      .then(data => {
        setTransactions([...transactions, data]);
        setFilteredTransactions([...filteredTransactions, data]);
      })
      .catch(error => console.error("Error adding transaction:", error));
  };

  const handleDeleteTransaction = (transactionToDelete) => {
    fetch(`http://localhost:8001/transactions/${transactionToDelete.id}`, {
      method: "DELETE"
    })
      .then(() => {
        const updatedTransactions = transactions.filter(
          (transaction) => transaction.id !== transactionToDelete.id
        );
        setTransactions(updatedTransactions);
        setFilteredTransactions(updatedTransactions);
      })
      .catch(error => console.error("Error deleting transaction:", error));
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <AddTransactionForm onAddTransaction={handleAddTransaction} />
      <TransactionsList transactions={filteredTransactions} onDeleteTransaction={handleDeleteTransaction} />
    </div>
  );
}

export default AccountContainer;