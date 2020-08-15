import React, { Component } from 'react';
import {NavLink, Route } from 'react-router-dom';
import Admin from './Admin';
import User from './User';
import '../index.css';

export default class Parent extends Component {
    render() {
        return (
            <div className="container">
                <div className="navigation-bar">
                    <NavLink to="/parent/admin" activeStyle={{borderBottom:"2px solid blue"}} className="navlinks">Admin</NavLink>
                    <NavLink to="/parent/user" activeStyle={{borderBottom:"2px solid blue"}} className="navlinks">User</NavLink>
                </div>
                <div className="RoutedCom">
                    <Route exact path="/parent/admin" component={Admin}></Route>
                    <Route exact path="/parent/user" component={User}></Route>
                </div>
            </div>
        )
    }
}
