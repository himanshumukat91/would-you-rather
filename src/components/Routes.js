import React from "react";
import PropTypes from "prop-types"; 
import { Switch, Route } from "react-router-dom";
import Home from './home/Home';
import Login from './login/Login';

function Routes(props) {
  return (
        <div className="container">
            <Switch>
            {
                props.currentUser === '' ? <Route component={Login}/> :
                <>
                    <Route path='/' exact component={Home} />
                    <Route path='/login' exact component={Login} />
                </>
            }
            </Switch>
        </div>
    );
}

Routes.propTypes = {currentUser: PropTypes.string};

export default Routes;