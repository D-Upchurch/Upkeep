import React, { useEffect, useState } from 'react';
import { editTransaction, getTransactionById } from '../../modules/transactionManager';
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { momentTransDateFixer } from "../../modules/helper";

export const EditTransaction = () => {
    const [transaction, setTransaction] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const fetchTransaction = () => {
        return getTransactionById(id).then(transaction => {
            let editedTransaction = transaction
            editedTransaction.date = momentTransDateFixer(transaction)
            setTransaction(editedTransaction)
        });
    };

    const handleControlledInputChange = (event) => {
        let editedTransaction = { ...transaction };
        let selectedVal = event.target.value

        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }

        if (event.target.id.includes('price')) {
            selectedVal = parseInt(selectedVal)
        }

        if (event.target.id.includes('type')) {
            selectedVal = parseInt(selectedVal)
        }


        editedTransaction[event.target.id] = selectedVal
        setTransaction(editedTransaction);
    }

    const handleDate = (event) => {
        event.preventDefault();
        let editedTransaction = { ...transaction };
        console.log(event.target.value)
        let editDate = event.target.value
        editedTransaction[event.target.id] = editDate
        setTransaction(editedTransaction)
    };

    const handleClickSaveTransaction = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let editedTransaction = { ...transaction };
        editTransaction(editedTransaction).then(() => history.push('/Transaction'))
    };

    const handleClickCancel = (event) => {
        event.preventDefault();
        history.push('/Transaction')
    };

    useEffect(() => {
        fetchTransaction();
    }, []);

    return (
        <>
            <Form>
                <h1>Edit Transaction</h1>
                <FormGroup>
                    <Label for="type" sm={2}>Select Type</Label>

                    <Input type="select" name="select" id="type" selected={transaction.type} onChange={handleControlledInputChange} required>

                        <option value={0}>Expense</option>
                        <option value={1}>Payment</option>
                    </Input>

                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" id="description" placeholder="Description" defaultValue={transaction.description} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="number" id="price" placeholder="Price" defaultValue={transaction.price} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input type="date" id="date" defaultValue={momentTransDateFixer(transaction)} value={transaction.date} format="YYYY-MM-DD" onChange={handleDate} />
                </FormGroup>
                <Button className="btn btn-primary" onClick={handleClickSaveTransaction}>Save Transaction</Button>
                <Button className="btn btn-primary" onClick={handleClickCancel}>Cancel</Button>
            </Form>
        </>
    )
}