import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute =({component: Component, ...rest}) =>{
    if (window.location.pathname === '/login'){
        window.location.reload()    
    }
    return (
        <Route
            {...rest}
            render={props =>{
                console.log(props);
                if(sessionStorage.getItem('token')) {
                    return <Component {...props} /> 
                } else {
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                 from: props.location
                            }
                        }
                    }/>
                }
            }}
         />
    )
}