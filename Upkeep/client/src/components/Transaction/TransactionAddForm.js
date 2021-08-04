import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, FormGroup, Button, Label, Input, Col } from 'reactstrap';
import { addTransaction } from '../../modules/transactionManager';

export const TransactionAddForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [transaction, setTransaction] = useState({})
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        let newTransaction = { ...transaction }
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

        newTransaction[event.target.id] = selectedVal
        setTransaction(newTransaction);
    };

    const handleClickSaveTransaction = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let newTransaction = { ...transaction };
        addTransaction(newTransaction).then(() => history.push('/Transaction'))
    };

    const handleClickCancel = (event) => {
        event.preventDefault();
        history.push('/Transaction')
    };

    return (
        <>
            <Form>
                <h2 className="List-header">Add Transaction</h2>
                <FormGroup>
                    <Label for="type" sm={2}>Select Type</Label>

                    <Input type="select" name="select" id="type" value={transaction.type} onChange={handleControlledInputChange} required>

                        <option value={0}>Expense</option>
                        <option value={1}>Payment</option>
                    </Input>

                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="text" id="description" placeholder="Description" value={transaction.description} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="price">Price</Label>
                    <Input type="number" id="price" placeholder="Price" value={transaction.price} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="date">Date</Label>
                    <Input type="date" id="date" value={transaction.date} onChange={handleControlledInputChange} />
                </FormGroup>
                <Button id="greenButton" className="btn btn-primary" onClick={handleClickSaveTransaction}>Save Transaction</Button>
                <Button id="greenButton" className="btn btn-primary" onClick={handleClickCancel}>Cancel</Button>
            </Form>
        </>
    )

};
