import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { addProperty } from '../../modules/propertyManager';


export const PropertyAddForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [property, setProperty] = useState({})
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        let newProperty = { ...property }
        let selectedVal = event.target.value

        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }

        newProperty[event.target.id] = selectedVal
        setProperty(newProperty);
    };

    const handleClickSaveProperty = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let newProperty = { ...property };

        addProperty(newProperty).then(() => history.push('/Property'))
    };

    const handleClickCancel = (event) => {
        event.preventDefault();
        history.push('/Property')
    };

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" id="name" placeholder="Client Name" value={property.name} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" id="address" placeholder="Property Address" value={property.address} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="serviceCharge">Service Charge</Label>
                    <Input type="number" id="serviceCharge" placeholder="Service Charge" value={property.serviceCharge} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="dateCut">Last Date Serviced</Label>
                    <Input type="date" id="lastService" value={property.lastService} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="imageUrl">Image Url</Label>
                    <Input type="text" id="image" placeholder="Image URL" value={property.image} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input type="textarea" id="notes" placeholder="Notes" value={property.notes} onChange={handleControlledInputChange} />
                </FormGroup>
                <Button className="btn btn-primary" onClick={handleClickSaveProperty}>Save Property</Button>
                <Button className="btn btn-primary" onClick={handleClickCancel}>Cancel</Button>
            </Form>
        </>
    )
}