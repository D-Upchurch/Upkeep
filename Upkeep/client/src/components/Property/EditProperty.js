import React, { useEffect, useState } from "react";
import { editProperty, getPropertyById } from "../../modules/propertyManager";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { momentDateFixer } from "../../modules/helper";




export const EditProperty = () => {
    const [property, setProperty] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const fetchProperty = () => {
        return getPropertyById(id).then(property => {
            let editedProperty = property
            editedProperty.lastService = momentDateFixer(property)
            setProperty(editedProperty)
        });
    }

    const handleControlledInputChange = (event) => {
        let editedProperty = { ...property };
        let selectedVal = event.target.value

        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }

        editedProperty[event.target.id] = selectedVal
        setProperty(editedProperty);
    };

    const handleDate = (event) => {
        event.preventDefault();
        let editedProperty = { ...property };
        console.log(event.target.value)
        let editDate = event.target.value
        editedProperty[event.target.id] = editDate
        setProperty(editedProperty)
    }

    const handleClickSaveProperty = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let editedProperty = { ...property };
        editProperty(editedProperty).then(() => history.push('/Property'))
    };

    const handleClickCancel = (event) => {
        event.preventDefault();
        history.push('/Property')
    };

    useEffect(() => {
        fetchProperty()
    }, []);

    return (
        <>
            <Form>
                <h1>Edit Property</h1>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" id="name" placeholder="Client Name" defaultValue={property.name} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" id="address" placeholder="Property Address" defaultValue={property.address} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="serviceCharge">Service Charge</Label>
                    <Input type="number" id="serviceCharge" placeholder="Service Charge" defaultValue={property.serviceCharge} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="dateCut">Last Date Serviced</Label>
                    <Input type="date" id="lastService" defaultValue={momentDateFixer(property)} value={property.lastService} format="YYYY-MM-DD" onChange={handleDate} />
                </FormGroup>
                <FormGroup>
                    <Label for="imageUrl">Image Url</Label>
                    <Input type="text" id="image" placeholder="Image URL" defaultValue={property.image} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input type="textarea" id="notes" placeholder="Notes" defaultValue={property.notes} onChange={handleControlledInputChange} />
                </FormGroup>
                <Button className="btn btn-primary" disabled={isLoading} onClick={handleClickSaveProperty}>Save Property</Button>
                <Button className="btn btn-primary" onClick={handleClickCancel}>Cancel</Button>
            </Form>
        </>
    )
};