import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/chart.css';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';
import Home from './Home.js';
import Page from './Page.js';
import Chart1 from './Chart1.js';
import Chart2 from './Chart2.js';
import Test from './Test.js';
import L, { layerGroup } from 'leaflet'
import { Map, TileLayer, Marker, Popup, ZoomControl, LayersControl, LayerGroup } from 'react-leaflet'
import marker from './img/map-marker.png'
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

//import gages from './data/sites.json'


export default function Routing(props) {

    // Setup map
    const startLocation = {
        lat: 45.4865092,
        lng: -122.421757,
        zoom: 11,
    }
    const mapMarker = L.icon({
        iconUrl: marker,
        iconSize: [25, 25],
    })

    const position = [startLocation.lat, startLocation.lng]


    // Do for each loop to reach in each gage from json file then save all six data
    return (
        <>
            <Router>
                <Navbar collapseOnSelect className="navbar">
                    <div className="h-box">
                        <Navbar.Brand>
                            <h1>Portland Water Usage Data Dashboard</h1>
                            <h2>Portland Water Usage Data Dashboard</h2>
                            <h3 className='small1'>Portland Water Usage Data Dashboard</h3>
                            <h3 className='small2'>Portland Water Usage Data </h3><h3 className='small2'>Dashboard</h3>
                            <h3 className='small3'>Portland Water Usage </h3><h3 className='small3'>Data Dashboard</h3>
                            <h4 className='small4'>Portland Water Usage </h4><h4 className='small4'>Data Dashboard</h4>
                        </Navbar.Brand>
                    </div>
                    <Navbar.Toggle />

                    <Navbar.Collapse>
                        <Nav>
                            <NavItem className="pull-right">
                                <h2 className='big'>
                                    <Link to="/">Home</Link>
                                </h2>
                                <h3 className='med'>
                                    <Link to="/">Home</Link>
                                </h3>
                                <h4 className='small'>
                                    <Link to="/">Home</Link>
                                </h4>
                            </NavItem>
                            <NavItem className="pull-right">
                                <h2 className='big'>
                                    <Link to="/page">Gradient</Link>
                                </h2>
                                <h3 className='med'>
                                    <Link to="/page">Gradient</Link>
                                </h3>
                                <h4 className='small'>
                                    <Link to="/page">Gradient</Link>
                                </h4>
                            </NavItem>
                        </Nav>
                        <Nav>
                            <h2 className='big1'>
                                <NavDropdown className="drop" drop='left' title="Chart" id="basic-nav-dropdown">
                                    <Navbar collapseOnSelect className="navbar">
                                        <NavbarCollapse>
                                            <Nav>
                                                <NavItem className="pull-right">
                                                    <h2 className="big">Discharge Data</h2>
                                                    <div className="chart1">
                                                        <Route>
                                                            <Chart1 />
                                                        </Route>
                                                    </div>
                                                </NavItem>
                                            </Nav>
                                        </NavbarCollapse>
                                        <NavbarCollapse>
                                            <Nav>
                                                <NavItem className="pull-right">
                                                    <h2 className="big">Temperature Data</h2>
                                                    <div className="chart2">
                                                        <Route>
                                                            <Chart2 />
                                                        </Route>
                                                    </div>
                                                </NavItem>
                                            </Nav>
                                        </NavbarCollapse>
                                    </Navbar>
                                </NavDropdown>
                            </h2>
                            <h2 className='big2'>
                                <NavDropdown className="drop" drop='down' title="Chart" id="basic-nav-dropdown">
                                    <Navbar collapseOnSelect className="navbar">
                                        <NavbarCollapse>
                                            <Nav>
                                                <NavItem className="pull-right">
                                                    <h2 className="big">Discharge Data</h2>
                                                    <div className="chart1">
                                                        <Route>
                                                            <Chart1 />
                                                        </Route>
                                                    </div>
                                                </NavItem>
                                            </Nav>
                                        </NavbarCollapse>
                                        <NavbarCollapse>
                                            <Nav>
                                                <NavItem className="pull-right">
                                                    <h2 className="big">Temperature Data</h2>
                                                    <div className="chart2">
                                                        <Route>
                                                            <Chart2 />
                                                        </Route>
                                                    </div>
                                                </NavItem>
                                            </Nav>
                                        </NavbarCollapse>
                                    </Navbar>
                                </NavDropdown>
                            </h2>
                            <h3 className='med'>
                                <NavDropdown className="drop" drop='down' title="Chart" id="basic-nav-dropdown">
                                    <Navbar collapseOnSelect className="navbar">
                                        <NavbarCollapse>
                                            <Nav>
                                                <NavItem className="pull-right">
                                                    <h3 className="med">Discharge Data</h3>
                                                    <div className="chart1">
                                                        <Route>
                                                            <Chart1 />
                                                        </Route>
                                                    </div>
                                                </NavItem>
                                            </Nav>
                                        </NavbarCollapse>
                                        <NavbarCollapse>
                                            <Nav>
                                                <NavItem className="pull-right">
                                                    <h3 className="med">Temperature Data</h3>
                                                    <div className="chart2">
                                                        <Route>
                                                            <Chart2 />
                                                        </Route>
                                                    </div>
                                                </NavItem>
                                            </Nav>
                                        </NavbarCollapse>
                                    </Navbar>
                                </NavDropdown>
                            </h3>
                            <h4 className='small'>
                                <NavDropdown className="drop" drop='down' title="Chart" id="basic-nav-dropdown">
                                    <Navbar collapseOnSelect className="navbar">
                                        <NavbarCollapse>
                                            <Nav>
                                                <NavItem className="pull-right">
                                                    <h4 className="small">Discharge Data</h4>
                                                    <div className="chart1">
                                                        <Route>
                                                            <Chart1 />
                                                        </Route>
                                                    </div>
                                                </NavItem>
                                            </Nav>
                                        </NavbarCollapse>
                                        <NavbarCollapse>
                                            <Nav>
                                                <NavItem className="pull-right">
                                                    <h4 className="small">Temperature Data</h4>
                                                    <div className="chart2">
                                                        <Route>
                                                            <Chart2 />
                                                        </Route>
                                                    </div>
                                                </NavItem>
                                            </Nav>
                                        </NavbarCollapse>
                                    </Navbar>
                                </NavDropdown>
                            </h4>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Map className="map" center={position} zoom={startLocation
                    .zoom} scrollWheelZoom={true} zoomControl={false}>
                    <ZoomControl position="bottomleft" />
                    <TileLayer
                        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                        url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=a25BWEXwxHphmT537wWB"
                    />

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
                </Map>
            </Router>

        </>
    )

}
