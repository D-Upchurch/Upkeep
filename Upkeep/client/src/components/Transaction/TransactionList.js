import React, { useEffect, useState } from "react";
import { deleteTransaction, searchTransactions, getTransactionsByFirebaseUserId, filterWeekly, filterMonthly } from "../../modules/transactionManager";
import Transaction from "./TransactionCard";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { Button, Input, Spinner } from "reactstrap";


export const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const history = useHistory();

    const fetchTransactions = () => {
        return getTransactionsByFirebaseUserId().then(res => setTransactions(res))
    };



    const handleSearch = (event) => {
        event.preventDefault();
        let selectedVal = event.target.value
        setSearchInput(selectedVal)
    };

    const fetchSearch = () => {
        return searchTransactions(searchInput).then(res => setTransactions(res))
    }


    const handleDeleteTransaction = (id) => {
        let yes = window.confirm("Are you sure you want to delete this transaction?")
        if (yes === true) {
            deleteTransaction(id)
                .then(fetchTransactions())
        }
    };

    const handleFilterWeekly = (event) => {
        event.preventDefault();
        filterWeekly().then((res) => { setTransactions(res) })
    };

    const handleFilterMonthly = (event) => {
        event.preventDefault();
        filterMonthly().then((res) => { setTransactions(res) })
    }

    const handleAddTransaction = (event) => {
        event.preventDefault();
        history.push('/Transaction/Create')
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    if (transactions.length < 1) {
        return (
            <>
                <h1>My Transactions</h1>
                <div>
                    <button className="btn btn-primary" onClick={handleAddTransaction}>Add Transaction</button>
                    <Input type="text" onChange={handleSearch}></Input>
                    <Button className="btn btn-primary" onClick={fetchSearch}>Search</Button>
                </div>
                <Spinner className="app-spinner dark" />
            </>
        )
    }
    else {

        return (
            <>
                <h1>My Transactions</h1>
                <div>
                    <button className="btn btn-primary" onClick={handleAddTransaction}>Add Transaction</button>
                    <Input type="text" onChange={handleSearch}></Input>
                    <Button className="btn btn-primary" onClick={fetchSearch}>Search</Button>
                    <Button className="btn btn-primary" onClick={handleFilterWeekly}>Last 7 Days</Button>
                    <Button className="btn btn-primary" onClick={handleFilterMonthly}>Last Month</Button>
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
    }

};