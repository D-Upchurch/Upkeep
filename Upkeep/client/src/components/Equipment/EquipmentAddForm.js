import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { addEquipment } from '../../modules/equipmentManager';

export const EquipmentAddForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [equipment, setEquipment] = useState({})
    const history = useHistory()

    const handleControlledInputChange = (event) => {
        let newEquipment = { ...equipment }
        let selectedVal = event.target.value

        if (event.target.id.includes('Id')) {
            selectedVal = parseInt(selectedVal)
        }

        newEquipment[event.target.id] = selectedVal
        setEquipment(newEquipment);
    };

    const handleClickSaveEquipment = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let newEquipment = { ...equipment };
        addEquipment(newEquipment).then(() => history.push('/Equipment'))
    };

    const handleClickCancel = (event) => {
        event.preventDefault();
        history.push('/Equipment')
    };

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input type="text" id="type" placeholder="Equipment type" value={equipment.type} onChange={handleControlledInputChange} />
                </FormGroup>
            </Form>
        </>
    )
}