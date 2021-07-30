import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home"
import { PropertyList } from './Property/PropertyList';
import { PropertyDetails } from './Property/PropertyDetails';
import { PropertyAddForm } from './Property/PropertyAddForm';
import { EditProperty } from './Property/EditProperty';
import { EquipmentList } from './Equipment/EquipmentList';
import { EquipmentDetails } from './Equipment/EquipmentDetails';
import { EquipmentAddForm } from './Equipment/EquipmentAddForm';
import { EditEquipment } from './Equipment/EditEquipment';

export default function ApplicationViews({ isLoggedIn }) {

    return (

        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>

                //! Property paths
                <Route path="/Property" exact>
                    {isLoggedIn ? <PropertyList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Property/details/:id" exact>
                    {isLoggedIn ? <PropertyDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Property/Create" exact>
                    {isLoggedIn ? <PropertyAddForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Property/edit/:id">
                    {isLoggedIn ? <EditProperty /> : <Redirect to="/login" />}
                </Route>

                //! Equipment paths
                <Route path="/Equipment" exact>
                    {isLoggedIn ? <EquipmentList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Equipment/details/:id" exact>
                    {isLoggedIn ? <EquipmentDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Equipment/Create" exact>
                    {isLoggedIn ? <EquipmentAddForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Equipment/edit/:id">
                    {isLoggedIn ? <EditEquipment /> : <Redirect to="/login" />}
                </Route>


                <Route path="/login" exact>
                    <Login />
                </Route>

                <Route path="/register" exact>
                    <Register />
                </Route>

            </Switch>
        </main >

    );
};
