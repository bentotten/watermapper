import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/chart.css';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import Home from './Home.js';
import Page from './Page.js';

import dummyChart from './img/basic-bar-graph.png';


export default function Routing(props) {
    return (
        <Router>
            <div>
                <Route>
                    <Home />
                </Route>
                <Navbar inverse collapseOnSelect className="navbar">
                        <div className="h-box">
                            <Navbar.Brand>
                                <h1>Portland Water Usage Data Dashboard</h1>
                            </Navbar.Brand>
                        </div>
                        <Navbar.Toggle />
                    
                    <Navbar.Collapse>
                    
                        <Nav>
                        <NavItem className="pull-right">
                            <h2>
                                <Link to="/">Home</Link>
                            </h2>
                        </NavItem>
                        <NavItem className="pull-right">
                            <h2>
                                <Link to="/page">Gradient</Link>
                            </h2>
                        </NavItem>
                        </Nav>
                        <Nav>
                        <h2>
                        <NavDropdown className="drop" drop='left' title="Chart" id="basic-nav-dropdown">
                                <div className="chart">
                                    <img id="graph" src={dummyChart} alt="graph"/>
                                </div>
                        </NavDropdown>
                        </h2>
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
                    
                </Switch>
            </div>
        </Router>
    )
}
