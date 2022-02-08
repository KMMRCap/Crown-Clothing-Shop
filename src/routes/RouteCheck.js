import React from 'react';
import { Navigate } from 'react-router-dom';
import Auth from '../components/Auth'

const RouteCheck = (props) => {

    return !props.user ?
        (props.comp === 'auth' ?
            <Auth />
            :
            null
        )
        :
        <Navigate to='/' replace />
}

export default RouteCheck;