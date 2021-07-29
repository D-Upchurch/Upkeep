import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Equipment = ({ equipment, handleDeleteEquipment }) => {
    return (
        <Card>
            <CardBody>
                <h3>{equipment.type}</h3>
                <h3>{equipment.make}</h3>
                <Link to={`/Equipment/details/${equipment.id}`}>
                    <strong>Details</strong>
                </Link>
                <br />
                <Link to={`/Equipment/edit/${equipment.id}`}>
                    <strong>Edit</strong>
                </Link>
                <br />
                <button type="button" className="btn btn-primary" onClick={() => handleDeleteEquipment(equipment.id)}>Delete</button>
            </CardBody>
        </Card>
    )
};

export default Equipment;