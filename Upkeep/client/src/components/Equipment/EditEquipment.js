import React, { useEffect, useState } from "react";
import { editEquipment, getEquipmentById } from "../../modules/equipmentManager";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

export const EditEquipment = () => {
    const [equipment, setEquipment] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const fetchEquipment = () => {
        return getEquipmentById(id).then(equipment => {
            setEquipment(equipment)
        });
    };

    const handleControlledInputChange = (event) => {
        let editedEquipment = { ...equipment };
        let selectedVal = event.target.value

        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }

        editedEquipment[event.target.id] = selectedVal
        setEquipment(editedEquipment)
    };

    const handleClickSaveEquipment = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let editedEquipment = { ...equipment };
        editEquipment(editedEquipment).then(() => history.push('/Equipment'))
    };

    const handleClickCancel = (event) => {
        event.preventDefault();
        history.push('/Equipment')
    };

    useEffect(() => {
        fetchEquipment()
    }, []);

    return (
        <>
            <Form>
                <h2>Edit Equipment</h2>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input type="text" id="type" placeholder="Equipment type" value={equipment.type} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="make">Make</Label>
                    <Input type="text" id="make" placeholder="Make" value={equipment.make} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="model">Model</Label>
                    <Input type="text" id="model" placeholder="Model" value={equipment.model} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="hours">Hours</Label>
                    <Input type="number" id="hours" placeholder="hours" value={equipment.hours} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="imageUrl">Image Url</Label>
                    <Input type="text" id="image" placeholder="Image URL" value={equipment.image} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input type="textarea" id="notes" placeholder="Notes" value={equipment.notes} onChange={handleControlledInputChange} />
                </FormGroup>
                <Button className="btn btn-primary" onClick={handleClickSaveEquipment}>Save Equipment</Button>
                <Button className="btn btn-primary" onClick={handleClickCancel}>Cancel</Button>
            </Form>
        </>
    )
}