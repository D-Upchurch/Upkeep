import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { dateFixer } from "../../modules/helper";
import { useHistory } from "react-router";

export const Property = ({ property, handleDeleteProperty }) => {
    const history = useHistory();
    const cutDate = dateFixer(property)

    return (
        <Card>
            <CardBody>
                <h2>{property.name}</h2>
                <p>{property.address}</p>
                <p>Last Date Serviced: {cutDate}</p>
                <div className="buttons-row">
                    <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => history.push(`/Property/details/${property.id}`)}>Details</Button>
                    <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => history.push(`/Property/edit/${property.id}`)}>Edit</Button>
                    <button type="button" id="greenButton" className="btn btn-primary" onClick={() => handleDeleteProperty(property.id)}>Delete</button>

                </div>
            </CardBody>
        </Card>
    )
};

export default Property;