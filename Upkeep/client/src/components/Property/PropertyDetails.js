import React, { useEffect, useState } from 'react';
import { getPropertyById, deleteProperty } from '../../modules/propertyManager';
import { Card, CardBody, Button } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import { dateFixer } from '../../modules/helper';
import { useHistory } from 'react-router';

export const PropertyDetails = () => {
    const [property, setProperty] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const fetchProperty = () => {
        return getPropertyById(id).then(property => setProperty(property));
    }


    const cutDate = dateFixer(property)

    const handleDeleteProperty = (id) => {
        let yes = window.confirm("Are you sure you want to delete this property?")
        if (yes === true) {
            deleteProperty(id)
                .then(history.push("/Property"))
        }
    }

    useEffect(() => {
        fetchProperty();
    }, []);

    return (
        <>
            <Card>
                <img src={property.image} style={{ width: '300px' }} alt={"A fresh cut lawn"} />
                <CardBody>
                    <h2>Name: {property.name}</h2>
                    <h2>Address: {property.address}</h2>
                    <p>Service Charge: ${property.serviceCharge}</p>
                    <p>Last Date Serviced: {cutDate}</p>
                    <p>Notes: {property.notes}</p>
                </CardBody>
                <div className="buttons-row">
                    <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => history.push(`/Property/edit/${property.id}`)}>Edit</Button>
                    <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => handleDeleteProperty(property.id)}>Delete</Button>
                    <Button type="button" id="greenButton" className="btn btn-primary" onClick={() => history.push(`/Property`)}>All Properties</Button>
                </div>
            </Card>
        </>
    )
}
