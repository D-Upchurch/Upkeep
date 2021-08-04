import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router";

export const Equipment = ({ equipment, handleDeleteEquipment }) => {
    const history = useHistory();

    return (
        <Card>
            <CardBody>
                <h3>{equipment.type}</h3>
                <h3>{equipment.make}</h3>
                <img src={equipment.image} style={{ width: '300px' }} />
                <div className="buttons-row">
                    <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => history.push(`/Equipment/details/${equipment.id}`)}>Details</Button>
                    <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => history.push(`/Equipment/edit/${equipment.id}`)}>Edit</Button>
                    <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => handleDeleteEquipment(equipment.id)}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Equipment;