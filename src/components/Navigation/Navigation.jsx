import React from "react";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

function Navigation() {
    return (
        <nav className={css.nav}>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? css.active : "")}
            >
                Home
            </NavLink>
            <NavLink
                to="/movies"
                className={({ isActive }) => (isActive ? css.active : "")}
            >
                Movies
            </NavLink>
        </nav>
    );
}

export default Navigation;