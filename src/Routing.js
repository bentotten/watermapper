import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import Home from './Home.js';
import Charts from './Charts.js';
import Page from './Page.js';


export default function Routing(props) {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <h1 className="navbar-brand">Navbar</h1>
                    <ul className="navbar ml-auto" id="links">
                        <li className="nav-link"><Link to="/">Home</Link></li>
                        <li className="nav-link"><Link to="/charts">Charts</Link></li>
                        <li className="nav-link"><Link to="/page">Other Page</Link></li>
                    </ul>
                </nav>
                {/* Switches */}
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/page">
                        <Page />
                    </Route>
                    <Route path="/charts">
                        <Charts />
                    </Route>
                    <Route>
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
