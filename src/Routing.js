import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/chart.css';
import './styles/App.css';
import './styles/navbar.css';
import Home from './Home.js';
import Page from './Page.js';
import Chart1 from './Chart1.js';
import Chart2 from './Chart2.js';
import React from 'react';

export default function Routing(props) {

    // Setup map
    const startLocation = {
        lat: 45.4865092,
        lng: -122.421757,
        zoom: 11,
    }

    const position = [startLocation.lat, startLocation.lng]
    const [displayDischarge, setDischarge] = React.useState(true);
    const [displayTemperature, setTemperature] = React.useState(false);
    // Do for each loop to reach in each gage from json file then save all six data
    return (
        <>
            <Router>
                <Navbar collapseOnSelect className="navbar">
                    <div className="h-box">
                        <Navbar.Brand>
                            <h1>Portland Watershed Data Dashboard</h1>
                            <h2>Portland Watershed Data Dashboard</h2>
                            <h3>Portland Watershed Data Dashboard</h3>
                            <h4 className="text-wrap">Portland Watershed Data Dashboard</h4>
                            <h5>Portland Watershed </h5><h5>Data Dashboard</h5>
                        </Navbar.Brand>
                    </div>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto align-items-center">
                            <Link to="/"><h2 className="big link">Home</h2></Link>
                            <Link to="/"><h3 className="med link">Home</h3></Link>
                            <Link to="/"><h4 className="little link">Home</h4></Link>
                            <Link to="/"><h5 className="tiny link">Home</h5></Link>
                            <Link to="/page"><h2 className="big link">Gradient</h2></Link>
                            <Link to="/page"><h3 className="med link">Gradient</h3></Link>
                            <Link to="/page"><h4 className="little link">Gradient</h4></Link>
                            <Link to="/page"><h5 className="tiny link">Gradient</h5></Link>
                            <h2 className='big'>
                                <NavDropdown drop='down' title="Chart" id="basic-nav-dropdown" >
                                    <ToggleButtonGroup className="border border-dark" type="radio" name="options" defaultValue={1}>
                                        <ToggleButton className="chartSelect" value={1} onClick={() => {setDischarge(true); setTemperature(false);}}>Discharge Data</ToggleButton>
                                        <ToggleButton className="chartSelect" value={2} onClick={() => {setDischarge(false); setTemperature(true);}}>Temperature Data</ToggleButton>
                                    </ToggleButtonGroup>
                                    <div className="chart1" style={{display: displayDischarge ? 'block': 'none'}}>
                                        <Route>
                                            <Chart1 />
                                        </Route>
                                    </div>
                                
                                    <div className="chart2" style={{display: displayTemperature ? 'block': 'none'}}>
                                        <Route>
                                            <Chart2 />
                                        </Route>
                                    </div>
                                </NavDropdown>
                            </h2>
                            <h3 className='med'>
                                <NavDropdown drop='down' title="Chart" id="basic-nav-dropdown" bsPrefix={"ml-auto"}>
                                    <ToggleButtonGroup className="border border-dark" type="radio" name="options" defaultValue={1}>
                                        <ToggleButton className="chartSelect" value={1} onClick={() => {setDischarge(true); setTemperature(false);}}>Discharge Data</ToggleButton>
                                        <ToggleButton className="chartSelect" value={2} onClick={() => {setDischarge(false); setTemperature(true);}}>Temperature Data</ToggleButton>
                                    </ToggleButtonGroup>
                                    <div className="chart1" style={{display: displayDischarge ? 'block': 'none'}}>
                                        <Route>
                                            <Chart1 />
                                        </Route>
                                    </div>
                                
                                    <div className="chart2" style={{display: displayTemperature ? 'block': 'none'}}>
                                        <Route>
                                            <Chart2 />
                                        </Route>
                                    </div>

                                </NavDropdown>
                            </h3>
                            <h4 className='little'>
                                <NavDropdown drop='down' title="Chart" id="basic-nav-dropdown" bsPrefix={"ml-auto"}>
                                    <ToggleButtonGroup className="border border-dark" type="radio" name="options" defaultValue={1}>
                                        <ToggleButton className="chartSelect" value={1} onClick={() => {setDischarge(true); setTemperature(false);}}>Discharge Data</ToggleButton>
                                        <ToggleButton className="chartSelect" value={2} onClick={() => {setDischarge(false); setTemperature(true);}}>Temperature Data</ToggleButton>
                                    </ToggleButtonGroup>
                                    <div className="chart1" style={{display: displayDischarge ? 'block': 'none'}}>
                                        <Route>
                                            <Chart1 />
                                        </Route>
                                    </div>
                                
                                    <div className="chart2" style={{display: displayTemperature ? 'block': 'none'}}>
                                        <Route>
                                            <Chart2 />
                                        </Route>
                                    </div>

                                </NavDropdown>
                            </h4>
                            <h5 className='tiny'>
                                <NavDropdown drop='down' title="Chart" id="basic-nav-dropdown" bsPrefix={"ml-auto"}>
                                    <ToggleButtonGroup className="border border-dark" type="radio" name="options" defaultValue={1}>
                                        <ToggleButton className="chartSelect" value={1} onClick={() => {setDischarge(true); setTemperature(false);}}>Discharge Data</ToggleButton>
                                        <ToggleButton className="chartSelect" value={2} onClick={() => {setDischarge(false); setTemperature(true);}}>Temperature Data</ToggleButton>
                                    </ToggleButtonGroup>
                                    <div className="chart1" style={{display: displayDischarge ? 'block': 'none'}}>
                                        <Route>
                                            <Chart1 />
                                        </Route>
                                    </div>
                                
                                    <div className="chart2" style={{display: displayTemperature ? 'block': 'none'}}>
                                        <Route>
                                            <Chart2 />
                                        </Route>
                                    </div>

                                </NavDropdown>
                            </h5>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>



                <Map className="map" center={position} zoom={startLocation
                    .zoom} scrollWheelZoom={true} zoomControl={false}>
                    <ZoomControl id="zoom" position="bottomleft" />
                    <TileLayer
                        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                        url="https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=uRRgRvCkCHUE4b1kpMfw"
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
                            {/*  <Route exact path="/test">
                                <Test />
                            </Route>
                            */}
                        </>
                    </Switch>
                </Map>
            </Router>

        </>
    )
}