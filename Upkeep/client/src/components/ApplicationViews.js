import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home"
import { PropertyList } from './Property/PropertyList';
import { PropertyDetails } from './Property/PropertyDetails';
import { PropertyAddForm } from './Property/PropertyAddForm';

export default function ApplicationViews({ isLoggedIn }) {

    return (

        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Property" exact>
                    {isLoggedIn ? <PropertyList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Property/details/:id" exact>
                    {isLoggedIn ? <PropertyDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/Property/Create" exact>
                    {isLoggedIn ? <PropertyAddForm /> : <Redirect to="/login" />}
                </Route>

                {/* <Route path="/Property/edit/:id">
                    {isLoggedIn ? <EditProperty /> : <Redirect to="/login" />}
                </Route> */}


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
