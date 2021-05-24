import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/chart.css';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import Home from './Home.js';
import Page from './Page.js';
import Chart from './Chart.js';
import dummyChart from './img/basic-bar-graph.png';
import Test from './Test.js';

//import gages from './data/sites.json'


export default function Routing(props) {

    // Do for each loop to reach in each gage from json file then save all six data

    return (
        <>
            <Router>
                <Navbar collapseOnSelect className="navbar">
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
                                        {/*<img id="graph" src={dummyChart} alt="graph"/>*/}
                                    </div>
                                </NavDropdown>
                            </h2>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {/* Switches */}
                <Switch>
                    <>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/home">
                            <Home />
                        </Route>
                        <Route exact path="/page">
                            <Page />
                        </Route>
                        <Route exact path="/test">
                            <Test />
                        </Route>
                    </>
                </Switch>
            </Router>
        </>
    )
}
