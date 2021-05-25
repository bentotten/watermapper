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
import L, { layerGroup } from 'leaflet'
import { Map, TileLayer, Marker, Popup, ZoomControl, LayersControl, LayerGroup } from 'react-leaflet'
import marker from './img/map-marker.png'

//import gages from './data/sites.json'


export default function Routing(props) {

    // Setup map
    const startLocation = {
        lat: 45.5051,
        lng: -122.6750,
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

                                    </div>
                                </NavDropdown>
                            </h2>
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

