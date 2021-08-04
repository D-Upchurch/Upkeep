import React, { useEffect, useState } from 'react';
import { deleteEquipment, getEquipmentByFirebaseUserId } from '../../modules/equipmentManager';
import Equipment from './EquipmentCard';
import firebase from 'firebase/app';
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { Spinner, Button } from 'reactstrap';

export const EquipmentList = () => {
    const [userEquipment, setUserEquipment] = useState([]);
    const history = useHistory();

    const fetchEquipment = () => {
        return getEquipmentByFirebaseUserId().then(res => setUserEquipment(res))
    };

    const handleDeleteEquipment = (id) => {
        let yes = window.confirm("Are you sure you want to delete this equipment?")
        if (yes === true) {
            deleteEquipment(id)
            return fetchEquipment();
        }
    }

    const handleAddEquipment = (event) => {
        event.preventDefault();
        history.push('/Equipment/Create')
    };

    useEffect(() => {
        fetchEquipment();
    }, []);

    if (userEquipment.length < 1) {
        return (
            <>
                <h2 className="List-header">My Equipment</h2>
                <div className="List-header">
                    <Button id="greenButton" className="btn btn-primary" onClick={handleAddEquipment}>Add Equipment</Button>
                </div>
                <br />
                <Spinner className="app-spinner dark" />
            </>
        )
    }
    else {

        return (
            <>
                <h2 className="List-header">My Equipment</h2>
                <div className="List-header">
                    <Button id="greenButton" className="btn btn-primary" onClick={handleAddEquipment}>Add Equipment</Button>
                </div>
                <br />
                <div className="container">
                    <div className="row justify-content-center">
                        {userEquipment.map((equipment) => (
                            <Equipment equipment={equipment} key={equipment.id} handleDeleteEquipment={handleDeleteEquipment} />
                        ))}
                    </div>
                </div>
            </>
        )
    }
};