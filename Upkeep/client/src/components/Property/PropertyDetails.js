import React, { useEffect, useState } from 'react';
import { getPropertyById, deleteProperty } from '../../modules/propertyManager';
import { Card, CardBody } from 'reactstrap';
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
                <img src={property.image} alt={"A fresh cut lawn"} />
                <CardBody>
                    <h2>Name: {property.name}</h2>
                    <h2>Address: {property.address}</h2>
                    <p>Service Charge: ${property.serviceCharge}</p>
                    <p>Last Day Serviced: {cutDate}</p>
                    <p>Notes: {property.notes}</p>
                </CardBody>
                <div>
                    <Link to={`/Property/edit/${property.id}`}>
                        <button className="btn btn-primary">Edit</button>
                    </Link>
                    <br />
                    <button type="button" className="btn btn-primary" onClick={() => handleDeleteProperty(property.id)}>Delete</button>
                    <br />
                    <Link to={`/Property`}>
                        <button className="btn btn-primary">Back to Properties</button>
                    </Link>
                </div>
            </Card>
        </>
    )
}