import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { addEquipment } from '../../modules/equipmentManager';

export const EquipmentAddForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [equipment, setEquipment] = useState({})
    const [image, setImage] = useState('')
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

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'upkeep')
        setIsLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dcu-upkeep/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()

        console.log(file.secure_url)
        setImage(file.secure_url)
        setIsLoading(false)
    }

    const handleClickSaveEquipment = (event) => {
        event.preventDefault();
        setIsLoading(true);
        let newEquipment = { ...equipment };
        newEquipment.image = image;
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
                    <Input type="number" id="hours" placeholder="Hours" value={equipment.hours} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input type="textarea" id="notes" placeholder="Notes" value={equipment.notes} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="imageUrl">Upload Image</Label>
                    <Input type="file" name="file" id="image" placeholder="Upload an image" onChange={uploadImage} />
                    <div>{isLoading ? (
                        <h3>Loading</h3>
                    ) : (
                        <img src={image} style={{ width: '300px' }} />
                    )}</div>
                </FormGroup>
                <Button className="btn btn-primary" onClick={handleClickSaveEquipment}>Save Equipment</Button>
                <Button className="btn btn-primary" onClick={handleClickCancel}>Cancel</Button>
            </Form>
        </>
    )
}