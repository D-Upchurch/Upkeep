import React, { useEffect, useState } from 'react';
import { getEquipmentById, deleteEquipment } from '../../modules/equipmentManager';
import { Card, CardBody } from 'reactstrap';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom'

export const EquipmentDetails = () => {
    const [equipment, setEquipment] = useState([]);
    const { id } = useParams();
    const history = useHistory();

    const fetchEquipment = () => {
        return getEquipmentById(id).then(equipment => setEquipment(equipment));
    }

    const handleDeleteEquipment = (id) => {
        let yes = window.confirm("Are you sure you want to delete this equipment?")
        if (yes === true) {
            deleteEquipment(id)
        }
        history.push("/Equipment")
    }

    useEffect(() => {
        fetchEquipment();
    }, []);

    if (equipment.hours === null) {
        return (
            <>
                <Card>
                    <img src={equipment.image} alt={`"a ${equipment.type}"`} />
                    <CardBody>
                        <h3>{equipment.type}</h3>
                        <h3>{equipment.make}</h3>
                        <h3>{equipment.model}</h3>
                        <p>Notes: {equipment.notes}</p>
                    </CardBody>
                    <div>
                        <Link to={`/Equipment/edit/${equipment.id}`}>
                            <button className="btn btn-primary">Edit</button>
                        </Link>

                        <button type="button" className="btn btn-primary" onClick={() => handleDeleteEquipment(equipment.id)}>Delete</button>

                        <Link to={`/Equipment`}>
                            <button className="btn btn-primary">Back to Equipment</button>
                        </Link>
                    </div>
                </Card>
            </>
        )
    }
    else {

        return (
            <>
                <Card>
                    <img src={equipment.image} alt={`"a ${equipment.type}"`} />
                    <CardBody>
                        <h3>{equipment.type}</h3>
                        <h3>{equipment.make}</h3>
                        <h3>{equipment.model}</h3>
                        <p>Hours: {equipment.hours}</p>
                        <p>Notes: {equipment.notes}</p>
                    </CardBody>
                    <div>
                        <Link to={`/Equipment/edit/${equipment.id}`}>
                            <button className="btn btn-primary">Edit</button>
                        </Link>

                        <button type="button" className="btn btn-primary" onClick={() => handleDeleteEquipment(equipment.id)}>Delete</button>

                        <Link to={`/Equipment`}>
                            <button className="btn btn-primary">Back to Equipment</button>
                        </Link>
                    </div>
                </Card>
            </>
        )
    }
}