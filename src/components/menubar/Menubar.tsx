import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './Menubar.css';

import { setCurrentUser, } from '../../actions/users';

interface Props {
    currentUser: string;
    setCurrentUser: Function;
    users: any;
};

interface State {
};

class Home extends PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { setCurrentUser, currentUser, users } = this.props;
        const userDetails = users[currentUser];

        if(!userDetails) return null;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Link to={`/`} className={`noTextDecoration menuIcon menuIconHome`} title='Home'>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="h6" className='hide'>
                            WOULD YOU RATHER
                        </Typography>
                    </Link>
                    <Link to={`/add`} className={`noTextDecoration menuIcon menuIconAdd`}>
                        <IconButton edge="start" color="inherit" aria-label="leaderboard" 
                            title='New Question'>
                            <AddCircleIcon />
                        </IconButton>
                    </Link>
                    <Link to={`/leaderboard`} className={`noTextDecoration menuIcon`}>
                        <IconButton edge="start" color="inherit" aria-label="leaderboard"
                            title='Leaderboard'>
                            <AssessmentIcon />
                        </IconButton>
                    </Link>
                    <img src={userDetails.avatarURL} alt={userDetails.name} className={`menuUserProfile menuIcon`} />
                    <Typography variant="subtitle2">
                        {currentUser}
                    </Typography>
                    <Button color="inherit" className='menuLogout'
                        onClick={() => setCurrentUser('')}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default connect(
    (state: any) => ({
        currentUser: state.user.currentUser,
        users: state.user.users,
    }),
    {
        setCurrentUser,
    },
)(Home);
