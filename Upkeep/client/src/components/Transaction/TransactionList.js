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
            return fetchTransactions();
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

    //! handles adding up the payments from transactions
    const payments = transactions.map(obj => {
        if (obj.type === 1) {
            return obj.price
        }
        else if (obj.type === 0) {
            return 0
        }
    });

    let sumPayments = 0;
    for (let i = 0; i < payments.length; i++) {
        sumPayments += payments[i];
    }

    //! handles adding up the expenses from transactions
    const expenses = transactions.map(obj => {
        if (obj.type === 0) {
            return obj.price
        }
        else if (obj.type === 1) {
            return 0
        }
    });

    let sumExpenses = 0;
    for (let i = 0; i < expenses.length; i++) {
        sumExpenses += expenses[i];
    }

    //! handles getting the net total of transactions
    let sumGain = 0;
    let sumLoss = 0;
    if (sumPayments > sumExpenses) {
        sumGain = (sumPayments - sumExpenses)
    }
    else if (sumExpenses > sumPayments) {
        sumLoss = (sumExpenses - sumPayments)
    }



    useEffect(() => {
        fetchTransactions();
    }, []);

    if (transactions.length < 1) {
        return (
            <>
                <h2 className="List-header">My Transactions</h2>
                <div>
                    <Button id="greenButton" className="btn btn-primary" onClick={handleAddTransaction}>Add Transaction</Button>
                    <Input className="reduce-search-width" type="text" onChange={handleSearch}></Input>
                    <Button className="btn btn-primary" onClick={fetchSearch}>Search</Button>
                </div>
                <Spinner className="app-spinner dark" />
            </>
        )
    }
    else {
        if (sumPayments > sumExpenses) {
            return (
                <>
                    <h2 className="List-header">My Transactions</h2>
                    <div className="List-top-row">
                        <Button id="greenButton" className="btn btn-primary" onClick={handleAddTransaction}>Add Transaction</Button>
                        <Input className="reduce-search-width" type="text" onChange={handleSearch}></Input>
                        <Button id="greenButton" className="btn btn-primary" onClick={fetchSearch}>Search</Button>
                    </div>
                    <div className="transaction-filter-buttons">
                        <Button id="greenButton" className="btn btn-primary" onClick={handleFilterWeekly}>Last 7 Days</Button>
                        <Button id="greenButton" className="btn btn-primary" onClick={handleFilterMonthly}>Last Month</Button>
                        <Button id="greenButton" className="btn btn-primary" onClick={fetchTransactions}>Reset</Button>
                    </div>
                    <br />
                    <div className="transaction-totals">
                        <h4 id="greenText">Gains:+ ${sumPayments}</h4>
                        <h4 id="redText">Losses:- ${sumExpenses}</h4>
                        <h4 id="greenText">Net Total:+ ${sumGain} </h4>
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
        } else if (sumExpenses > sumPayments) {
            return (
                <>
                    <h2 className="List-header">My Transactions</h2>
                    <div className="List-top-row">
                        <Button id="greenButton" className="btn btn-primary" onClick={handleAddTransaction}>Add Transaction</Button>
                        <Input className="reduce-search-width" type="text" onChange={handleSearch}></Input>
                        <Button id="greenButton" className="btn btn-primary" onClick={fetchSearch}>Search</Button>
                    </div>
                    <div className="transaction-filter-buttons">
                        <Button id="greenButton" className="btn btn-primary" onClick={handleFilterWeekly}>Last 7 Days</Button>
                        <Button id="greenButton" className="btn btn-primary" onClick={handleFilterMonthly}>Last Month</Button>
                        <Button id="greenButton" className="btn btn-primary" onClick={fetchTransactions}>Reset</Button>
                    </div>
                    <br />
                    <div className="transaction-totals">
                        <h4 id="greenText">Gains:+ ${sumPayments}</h4>
                        <h4 id="redText">Losses:- ${sumExpenses}</h4>
                        <h4 id="redText">Net Total:- ${sumLoss} </h4>
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

    }

};