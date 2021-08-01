import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "reactstrap";
import { filterWeekly } from "../modules/transactionManager";
import Transaction from "./Transaction/TransactionCard";
import { useHistory } from "react-router";

export const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const history = useHistory();

    const fetchFilterWeekly = () => {
        filterWeekly().then((res) => { setTransactions(res) })
    };

    const handleAllTransactions = (event) => {
        event.preventDefault();
        history.push("/Transaction")
    }

    useEffect(() => {
        fetchFilterWeekly();
    }, []);

    return (
        <>
            <Container>
                <Container>Properties</Container>
                <Container>
                    <span>Current Weekly Transactions</span>
                    <div className="container">
                        <div className="row justify-content-center">

                            {transactions.map((transaction) => (
                                <Transaction transaction={transaction} key={transaction.id} />
                            ))}

                            <Button className="btn btn-primary" onClick={handleAllTransactions}>All Transactions</Button>
                        </div>
                    </div>
                </Container>
            </Container>
        </>
    );
}

export default Home;