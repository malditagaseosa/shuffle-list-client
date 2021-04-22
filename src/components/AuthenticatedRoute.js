import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isEmpty } from '../helpers';

const AuthenticatedRoute = ({ children, ...rest }) => { 

    let token = sessionStorage.getItem('token');

    return (
        <Route {...rest}>
            {
                !isEmpty(token) && token
                ?
                    (children)
                :
                    (<Redirect to="/login" />)
            }
        </Route>     
    );
}

export default AuthenticatedRoute;