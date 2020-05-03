import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes'
// import NavBar from './NavBar';

class App extends Component {
  render() {
    const {currentUser} = this.props;
    return (
      <Router>
        <Fragment>
          <div>
            {/* <NavBar/> */}
            <Routes currentUser={currentUser}/>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default connect(
  (state) => ({
      currentUser: state.user.currentUser,
  }),
  {
  },
)(App);