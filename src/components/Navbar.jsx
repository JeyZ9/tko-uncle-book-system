import React from 'react'
import "../assets/css/navbar.css"
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    
    const { name } = props
  return (
    <nav className="navbar">
        <h1 className='store-name'>{name == undefined ? "Uncle Book" : name}</h1>
        <Link to="/" className='homeBtn'><span>{name == undefined ? "Home" : "Back"}</span></Link>
    </nav>
  )
}

export default Navbar