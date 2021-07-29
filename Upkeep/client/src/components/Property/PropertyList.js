import React, { useEffect, useState } from "react";
import { getPropertyById, deleteProperty, addProperty, editProperty, searchProperties, getPropertiesByFirebaseUserId } from "../../modules/propertyManager";
import { getUserFirebaseId } from "../../modules/authManager";
import Property from "./PropertyCard";
import firebase from "firebase/app";
import "firebase/auth";
import { Link, useHistory } from "react-router-dom";

// Display all of a User's properties

export const PropertyList = () => {
    const [userId, setUserId] = useState("");
    const [properties, setProperties] = useState([]);
    const history = useHistory();


    const fetchProperties = () => {
        return getPropertiesByFirebaseUserId(firebase.auth().currentUser.uid).then(res => setProperties(res))
    }


    const handleDeleteProperty = (id) => {
        let yes = window.confirm("Are you sure you want to delete this property?")
        if (yes === true) {
            deleteProperty(id)
                .then(fetchProperties())
        }
    }

    const handleAddProperty = (event) => {
        event.preventDefault();
        history.push('/Property/Create')
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <>
            <h1>My Properties</h1>
            <div>

                <button className="btn btn-primary" onClick={handleAddProperty}>Add Property</button>

            </div>
            <div className="container">
                <div className="row justify-content-center">
                    {properties.map((property) => (
                        <Property property={property} key={property.id} handleDeleteProperty={handleDeleteProperty} />
                    ))}
                </div>
            </div>
        </>
    )
};