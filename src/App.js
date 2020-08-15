import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import Parent from './components/Parent';

export default class App extends Component {
  render() {
    return (
      <Router className="hw100">
       <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to="/parent" /> 
                    )
                }}
              />
               <Route path="/parent" component={Parent} />
      </Router>
    )
  }
}
 
