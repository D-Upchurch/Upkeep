import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "reactstrap";
import { filterWeekly } from "../modules/transactionManager";
import { filterProperties } from "../modules/propertyManager";
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

    useEffect(() => {
        fetchFilterWeekly();
        fetchFilterProperties();
    }, []);

    return (
        <>
            <div className="home-flex">
                <div>
                    <span>Properties Needing Service</span>
                    <div className="container">
                        <div className="row justify-content-center">

                            {properties.map((property) => (
                                <Property property={property} key={property.id} />
                            ))}

                        </div>
                    </div>
                </div>
                <div>
                    <span>Current Weekly Transactions</span>
                    <div className="container">
                        <div className="row justify-content-center">

                            {transactions.map((transaction) => (
                                <Transaction transaction={transaction} key={transaction.id} />
                            ))}

                            <Button id="greenButton" className="btn btn-primary" onClick={handleAllTransactions}>All Transactions</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;