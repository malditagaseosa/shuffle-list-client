import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isEmpty } from '../helpers';

const UnauthenticatedRoute = ({ children, ...rest }) => {   
    let token = sessionStorage.getItem('token');    
    return (
        <Route {...rest}>
            {
                isEmpty(token)
                ?
                    (children)
                :
                    (<Redirect to="/home" />)
            }
        </Route>     
    );
}

export default UnauthenticatedRoute;