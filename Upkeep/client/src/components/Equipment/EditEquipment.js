import React, { useEffect, useState } from "react";
import { editEquipment, getEquipmentById } from "../../modules/equipmentManager";
import { Form, FormGroup, Button, Input, Label } from "reactstrap";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

export const EditEquipment = () => {
    const [equipment, setEquipment] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(`'${equipment.image}'`);
    const { id } = useParams();
    const history = useHistory();

    const fetchEquipment = () => {
        return getEquipmentById(id).then(equipment => {
            setImage(equipment.image)
            setEquipment(equipment)
        });
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
        editedEquipment.image = image;
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
                    <Label for="notes">Notes</Label>
                    <Input type="textarea" id="notes" placeholder="Notes" value={equipment.notes} onChange={handleControlledInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="imageUrl">Image Url: </Label>
                    <Input type="file" name="file" id="image" placeholder="Upload an image" onChange={uploadImage} />
                    <div>{isLoading ? (
                        <h3>Loading</h3>
                    ) : (
                        <img src={image} style={{ width: '300px' }} />
                    )}</div>
                </FormGroup>
                <Button id="greenButton" className="btn btn-primary" onClick={handleClickSaveEquipment}>Save Equipment</Button>
                <Button id="greenButton" className="btn btn-primary" onClick={handleClickCancel}>Cancel</Button>
            </Form>
        </>
    )
}