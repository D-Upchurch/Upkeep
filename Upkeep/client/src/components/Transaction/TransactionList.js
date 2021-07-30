import React, { useEffect, useState } from "react";
import { deleteTransaction, searchTransactions, getTransactionsByFirebaseUserId } from "../../modules/transactionManager";
import Transaction from "./TransactionCard";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

export const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const history = useHistory();

    const fetchTransactions = () => {
        return getTransactionsByFirebaseUserId(firebase.auth().currentUser.uid).then(res => setTransactions(res))
    };


    const handleDeleteTransaction = (id) => {
        let yes = window.confirm("Are you sure you want to delete this transaction?")
        if (yes === true) {
            deleteTransaction(id)
                .then(fetchTransactions())
        }
    };

    const handleAddTransaction = (event) => {
        event.preventDefault();
        history.push('/Transaction/Create')
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <>
            <h1>My Transactions</h1>
            <div>
                <button className="btn btn-primary" onClick={handleAddTransaction}>Add Transaction</button>
            </div>
            <div className="container">
                <div className="row justify-content-center">

                    {transactions.map((transaction) => (
                        <Transaction transaction={transaction} key={transaction.id} handleDeleteTransaction={handleDeleteTransaction} />
                    ))}
                </div>
            </div>
        </>
    )
};