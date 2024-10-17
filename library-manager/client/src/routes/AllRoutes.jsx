import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Books from '../pages/books/Books'
import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import CreateAdmin from '../pages/createAdmin/CreateAdmin'
import Profile from '../pages/profile/Profile'
import CreateBook from '../pages/createBook/CreateBook'
import Requests from '../pages/requests/Request'
import NotAuthorized from '../pages/notAuthorized/NotAuthorized'
import PrivateRoute from './PrivateRoute'
import About from '../pages/about/About'
import Admin from '../pages/admin/Admin'

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}></Route>
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>}></Route>
            <Route path="/createadmin" element={<PrivateRoute><CreateAdmin /></PrivateRoute>}></Route>
            <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>}></Route>
            <Route path="/addbook" element={<PrivateRoute><CreateBook /></PrivateRoute>} />
            <Route path="/requests" element={<PrivateRoute><Requests /></PrivateRoute>}></Route>
            <Route path="/noaccess" element={<NotAuthorized />}></Route>
        </Routes>
    )
}

export default AllRoutes
