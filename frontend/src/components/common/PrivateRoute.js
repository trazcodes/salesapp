import React from 'react'
import { isAuth } from './auth'
import { Navigate, Outlet } from 'react-router-dom'

// MAKING ROUTES PRIVATE(ONLY AVAILABLE AFTER LOGIN)
function PrivateRoute() {
    return isAuth()? <Outlet/> : <Navigate to={'/login'}/>
}

export default PrivateRoute;