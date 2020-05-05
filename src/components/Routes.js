import React from "react";
import PropTypes from "prop-types"; 
import { Switch, Route } from "react-router-dom";
import Home from './home/Home';
import Login from './login/Login';
import Questions from './questions/Questions';
import NoMatch from './noMatch/NoMatch';
import Menubar from './menubar/Menubar';
import Leaderboard from './leaderboard/Leaderboard';
import AddQuestion from './addQuestion/AddQuestion';

function Routes(props) {
  return (
        <div className="container">
            <Route path='/' component={Menubar} />            
            <Switch>        
                {!props.currentUser ? <Route component={Login}/> : null}
                <Route path='/' exact component={Home} />
                <Route path='/login' exact component={Login} />
                <Route path='/add' exact component={AddQuestion} />
                <Route path='/leaderboard' exact component={Leaderboard} />
                <Route path='/questions/:questionId' exact component={Questions} />
                <Route component={NoMatch} />
            </Switch>
        </div>
    );
}

Routes.propTypes = {currentUser: PropTypes.string};

export default Routes;