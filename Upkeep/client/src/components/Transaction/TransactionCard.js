import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router";
import { transactionDateFixer } from "../../modules/helper";

export const Transaction = ({ transaction, handleDeleteTransaction }) => {
    const history = useHistory();
    const date = transactionDateFixer(transaction)

    if (transaction.type === 0) {

        return (
            <Card>
                <CardBody>
                    <div className="flex-card">
                        <h3>{date}</h3>
                        <p>Description: {transaction.description}</p>
                        <h3 id="redText">- ${transaction.price}</h3>
                        <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => history.push(`/Transaction/edit/${transaction.id}`)}>Edit</Button>
                        <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</Button>

                    </div>
                </CardBody>
            </Card>
        )
    }

    if (transaction.type === 1) {
        return (
            <Card>
                <CardBody>
                    <div className="flex-card">

                        <h3>{date}</h3>

                        <p>Description: {transaction.description}</p>
                        <h3 id="greenText">+ ${transaction.price}</h3>

                        <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => history.push(`/Transaction/edit/${transaction.id}`)}>Edit</Button>
                        <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</Button>

                    </div>
                </CardBody>
            </Card>
        )
    }
};

export default Transaction;