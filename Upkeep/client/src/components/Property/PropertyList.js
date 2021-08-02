import React, { useEffect, useState } from "react";
import { deleteProperty, searchProperties, getPropertiesByFirebaseUserId } from "../../modules/propertyManager";
import Property from "./PropertyCard";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { Input, Button, Spinner } from "reactstrap";

// Display all of a User's properties

export const PropertyList = () => {

    const [properties, setProperties] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const history = useHistory();


    const fetchProperties = () => {
        return getPropertiesByFirebaseUserId().then(res => setProperties(res))
    }



    const handleSearch = (event) => {
        event.preventDefault();
        let selectedVal = event.target.value
        console.log(selectedVal)
        setSearchInput(selectedVal)
    };

    const fetchSearch = () => {
        return searchProperties(searchInput).then(res => setProperties(res))
    }


    const handleDeleteProperty = (id) => {
        let yes = window.confirm("Are you sure you want to delete this property?")
        if (yes === true) {
            deleteProperty(id)
                .then(fetchProperties())
        }
    };

    const handleAddProperty = (event) => {
        event.preventDefault();
        history.push('/Property/Create')
    };


    useEffect(() => {
        fetchProperties();
    }, []);


    if (properties.length < 1) {
        return (
            <>
                <h1>My Properties</h1>
                <div>

                    <button className="btn btn-primary" onClick={handleAddProperty}>Add Property</button>
                    <Input type="text" onChange={handleSearch}></Input>
                    <Button className="btn btn-primary" onClick={fetchSearch}>Search</Button>

                </div>
                <Spinner className="app-spinner dark" />
            </>
        )
    }
    else {

        return (
            <>
                <h1>My Properties</h1>
                <div>

                    <button className="btn btn-primary" onClick={handleAddProperty}>Add Property</button>
                    <Input type="text" onChange={handleSearch}></Input>
                    <Button className="btn btn-primary" onClick={fetchSearch}>Search</Button>

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
    }
};