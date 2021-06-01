/*import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/chart.css';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
    return (
        <Router>
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
                                    <Route>
                                        <Chart />
                                    </Route>
                                    {<img id="graph" src={dummyChart} alt="graph"/>}
                                </div>
                            </NavDropdown>
                        </h2>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Router>
    )
}*/