import React, { useEffect, useState } from "react";
import { getPropertyById, deleteProperty, addProperty, editProperty, searchProperties, getPropertiesByFirebaseUserId } from "../../modules/propertyManager";
import { getUserFirebaseId } from "../../modules/authManager";
import Property from "./PropertyCard";
import firebase from "firebase/app";
import "firebase/auth";

// Display all of a User's properties

export const PropertyList = () => {
    const [userId, setUserId] = useState("");
    const [properties, setProperties] = useState([]);


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

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <>
            <h1>My Properties</h1>
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