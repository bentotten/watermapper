import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import Home from './Home.js';
import Houses from './Houses.js';
import Search from './Search.js';


export default function Routing(props) {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <h1 className="navbar-brand">Exercise 03 Navbar</h1>
                    <ul className="navbar ml-auto" id="links">
                        <li className="nav-link"><Link to="/">Home</Link></li>
                        <li className="nav-link"><Link to="/search">Search</Link></li>
                        <li className="nav-link"><Link to="/houses">Houses</Link></li>
                    </ul>
                </nav>
                {/* Switches */}
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/houses">
                        <Houses />
                    </Route>
                    <Route>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

/*
function Home() {
    return <h2>Home</h2>
}
function Houses() {
    return <h2>Houses</h2>
}
function Search() {
    return <h2>Search</h2>
}
*/