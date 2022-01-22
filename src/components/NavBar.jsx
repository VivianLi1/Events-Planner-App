import { NavLink } from "react-router-dom";

export default function NavBar(){

    return(
        <div className="NavBar">
            <div className="Logo">
                <h2 className="Logo--1">amuse</h2>
                <i className="fas fa-circle xs"></i>
                <h2 className="Logo--2">ly</h2>
            </div>
            <NavLink to="/" className="icon icon--search"><i className="fas fa-search"></i></NavLink>
            <NavLink to="/myevents" className="icon icon--events"><i className="fas fa-heart"></i></NavLink>
            <NavLink to="/about" className="icon icon--about"><i className="fas fa-question"></i></NavLink>
        </div>
    )
}