import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const { userLoggedIn, currentUser } = useSelector(state => state.auth);
  return (
    <div className='headerWrapper'>
      <div className='headerContainer'>
        <h2><Link to="/">BookHeaven</Link></h2>
        <div>
          <Link to="/books">Books</Link>
          {currentUser?.role==="admin" && <Link to="/requests">Requests</Link>}
          {/* {currentUser?.role==="super_admin" && <Link to="/admins">Admins</Link>} */}
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
