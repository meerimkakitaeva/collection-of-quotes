import React from 'react';
import {Routes, Route} from "react-router-dom";
import {NavLink} from "react-router-dom";
import Quotes from "../Quotes/Quotes";
import Add from "../Add/Add";
import EditQuote from "../Edit/EditQuote";

const Main = () => {
    return (
        <div className="main-container">
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">Quotes</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/new-quote">Submit new quote</NavLink>
                </li>
            </ul>
            <Routes>
                <Route path="/" element={(<Quotes />)} />
                <Route path="/new-quote" element={(<Add />)} />
                <Route path="/edit-quote/:id" element={(<EditQuote />)} />
            </Routes>
        </div>
    );
};


export default Main;