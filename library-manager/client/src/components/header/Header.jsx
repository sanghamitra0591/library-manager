import React from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logo from "../../assets/images/bookheavenlogo.webp";

const Header = () => {
  const { userLoggedIn, currentUser } = useSelector(state => state.auth);
  const navigate = useNavigate();
  return (
    <div className='headerWrapper'>
      <div className='headerContainer'>
        <div onClick={()=>navigate("/")}>
          <img src={logo} alt="" />
          <h2><Link to="/">BookHeaven</Link></h2>
        </div>
        <div>
          <Link to="/books">Books</Link>
          {currentUser?.role==="admin" && <Link to="/requests">Requests</Link>}
          {currentUser?.role==="super_admin" && <Link to="/admin">Admins</Link>}
          <Link to="/about">About</Link>
          {userLoggedIn ? <Link to={"/profile"}>
            Profile
          </Link> :
            <button><Link to="/login">Login</Link></button>}
        </div>
      </div>
    </div>
  )
}

export default Header
