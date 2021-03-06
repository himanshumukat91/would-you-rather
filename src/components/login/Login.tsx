import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Login.css';

import { setCurrentUser } from '../../actions/users';

interface Props {
    users: any;
    setCurrentUser: Function;
    history: any;
    location: any;
};

interface State {
    selectedUser: string;
};

class Login extends PureComponent<Props, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
        selectedUser: '',
    }
  }

    selectUser = (event: React.ChangeEvent<{ value: unknown }>) => {
        const user:any = event.target.value;
        this.setState({
            selectedUser: user,
        })
    }

    login = () => {
        const { history, location } = this.props;
        const { selectedUser } = this.state;
        if(selectedUser){
            this.props.setCurrentUser(selectedUser);
            history.push(location.pathname);
        }
    }

    render() {
        const { users } = this.props;
        const { selectedUser } = this.state;
        const usernames = Object.keys(users);

        return (
            <div className='loginContainer'>
                <Typography variant="h5" className='loginHeading'>
                    TELL US WHO YOU ARE
                </Typography>
                <FormControl className='loginSelect'>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedUser}
                    onChange={this.selectUser}
                    >   
                        {(usernames || []).map(username => (
                            <MenuItem key={username} value={username}>
                                {users[username].name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" 
                    className='loginButton' onClick={this.login}>
                    Login
                </Button>
        </div>
        );
    }
}

export default connect(
    (state: any) => ({
        users: state.user.users,
    }),
    {
        setCurrentUser
    },
)(Login);
