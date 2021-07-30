import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { transactionDateFixer } from "../../modules/helper";

export const Transaction = ({ transaction, handleDeleteTransaction }) => {

    const date = transactionDateFixer(transaction)

    if (transaction.type === 0) {

        return (
            <Card>
                <CardBody>
                    <h3>{date}</h3>
                    <p>Description: {transaction.description}</p>
                    <h3 id="redText">${transaction.price}</h3>
                    <Link to={`/Transaction/edit/${transaction.id}`}>
                        <strong>Edit</strong>
                    </Link>
                    <br />
                    <button type="button" className="btn btn-primary" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                </CardBody>
            </Card>
        )
    }

    if (transaction.type === 1) {
        return (
            <Card>
                <CardBody>
                    <h3>{date}</h3>
                    <p>Description: {transaction.description}</p>
                    <h3 id="greenText">${transaction.price}</h3>
                    <Link to={`/Transaction/edit/${transaction.id}`}>
                        <strong>Edit</strong>
                    </Link>
                    <br />
                    <button type="button" className="btn btn-primary" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                </CardBody>
            </Card>
        )
    }
};

export default Transaction;