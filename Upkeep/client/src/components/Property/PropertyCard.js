import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { dateFixer } from "../../modules/helper";

export const Property = ({ property, handleDeleteProperty }) => {

    const cutDate = dateFixer(property)

    return (
        <Card>
            <CardBody>
                <p>{property.address}</p>
                <p>{cutDate}</p>
                <Link to={`/Property/details/${property.id}`}>
                    <strong>Details</strong>
                </Link>
                <br />
                <Link to={`/Property/edit/${property.id}`}>
                    <strong>Edit</strong>
                </Link>
                <br />
                <button type="button" className="btn btn-primary" onClick={() => handleDeleteProperty(property.id)}>Delete</button>
            </CardBody>
        </Card>
    )
};

export default Property;