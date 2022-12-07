import React, {Component, createContext} from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component{
    render(){
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="#">My CATTLE</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/cows">Cows <span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/births">Births</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/consultations">Consultations</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/milk-production">Milk Production</NavLink>
                    </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;