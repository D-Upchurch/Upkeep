import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "reactstrap";
import { filterWeekly, deleteTransaction } from "../modules/transactionManager";
import { filterProperties, deleteProperty } from "../modules/propertyManager";
import Transaction from "./Transaction/TransactionCard";
import Property from "./Property/PropertyCard";
import { useHistory } from "react-router";

export const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const [properties, setProperties] = useState([]);
    const history = useHistory();

    const fetchFilterWeekly = () => {
        filterWeekly().then((res) => { setTransactions(res) })
    };

    const fetchFilterProperties = () => {
        filterProperties().then((res) => { setProperties(res) })
    }

    const handleAllTransactions = (event) => {
        event.preventDefault();
        history.push("/Transaction")
    }

    const handleDeleteProperty = (id) => {
        let yes = window.confirm("Are you sure you want to delete this property?")
        if (yes === true) {
            deleteProperty(id)
            return fetchFilterProperties();
        }
    };

    const handleDeleteTransaction = (id) => {
        let yes = window.confirm("Are you sure you want to delete this transaction?")
        if (yes === true) {
            deleteTransaction(id)
            return fetchFilterWeekly();
        }
    };

    useEffect(() => {
        fetchFilterWeekly();
        fetchFilterProperties();
    }, []);

    return (
        <>
            <div className="home-flex">
                <div>
                    <h2>Properties Needing Service</h2>
                    <div className="container">
                        <div className="row justify-content-center">

                            {properties.map((property) => (
                                <Property property={property} key={property.id} handleDeleteProperty={handleDeleteProperty} />
                            ))}

                        </div>
                    </div>
                </div>
                <div>
                    <h2>Current Weekly Transactions</h2>
                    <div className="container">
                        <div className="row justify-content-center">

                            {transactions.map((transaction) => (
                                <Transaction transaction={transaction} key={transaction.id} handleDeleteTransaction={handleDeleteTransaction} />
                            ))}

                            <Button id="greenButton" className="btn btn-primary" onClick={handleAllTransactions} >All Transactions</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;