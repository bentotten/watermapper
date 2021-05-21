import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import Home from './Home.js';
import Page from './Page.js';

import dummyChart from './img/basic-bar-graph.png';


export default function Routing(props) {
    return (
        <Router>
            <div>
            <Navbar inverse collapseOnSelect>
                        <Navbar.Brand>
                        <a href="#brand">Portland Water Usage Data Dashboard</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                        <NavItem>
                            <Link to="/">Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/page">ReadMe</Link>
                        </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavDropdown eventKey={3} title="Chart" id="basic-nav-dropdown">
                                <div className="chart">
                                    <img src={dummyChart} alt="graph" />
                                </div>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>;  
                            
                {/* Switches */}
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/page">
                        <Page />
                    </Route>
                    <Route>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
