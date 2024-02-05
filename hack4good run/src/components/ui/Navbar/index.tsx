import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import logo from "../../../assets/Bigatheartlogo.jpg";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
            <img src={logo} width='90'/>
        </NavLink>
        <Bars />
        <NavMenu>
            <NavLink to="/about" activeStyle>
                About Us
            </NavLink>
            <NavLink to="/services" activeStyle>
                Volunteer
            </NavLink>
            <NavLink to="/contact-us" activeStyle>
                Gallery
            </NavLink>
            <NavLink to="/sign-up" activeStyle>
                Sign Up
            </NavLink>
        </NavMenu>
        <NavBtn>
            <NavBtnLink to='/signin'>
                Log In
            </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar;
