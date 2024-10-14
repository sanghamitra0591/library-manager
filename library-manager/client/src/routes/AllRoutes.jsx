import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Books from '../pages/books/Books'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import CreateAdmin from '../pages/createAdmin/CreateAdmin'
import Profile from '../pages/profile/Profile'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/createadmin" element={<CreateAdmin />}></Route>
            <Route path="/books" element={<Books />}></Route>
        </Routes>
    )
}

export default AllRoutes
