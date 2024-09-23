
import { useDispatch, useSelector } from "react-redux"
import { Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logout } from "../app/authenticationSlice";
import "../App.css";

const NavBar =() =>{
    const {isLoggedIn} = useSelector(state =>state.authenticationSlice);
    const dispatch = useDispatch();

    return <Nav className ='navbar'>
        <h1 style={{fontFamily: 'Brush Script, MT, cursive', color: 'white'}}> My Expenses</h1>
        {
            isLoggedIn
            ?<Button variant ='link' href='/signin' onClick={()=> dispatch(logout())} style={{color: 'white', fontWeight:'bold', textDecoration: 'none'}}>Log out</Button>
            :<div style = {{display:'flex'}}>
                <NavLink to='/signup' style={{color: 'white', fontWeight:'bold', textDecoration: 'none'}}>Sign up</NavLink>
                <NavLink to='/signin' style={{marginLeft:'1rem',color: 'white', fontWeight:'bold', textDecoration: 'none'}}>Sign in</NavLink>
            </div>
        }
    </Nav>
}

export default NavBar;