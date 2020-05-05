import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddQuestion.css';

import { postQuestion } from '../../actions/users';
import { saveQuestion } from '../../actions/questions';

interface Props {
    currentUser: string;
    users: any;
    postQuestion: Function;
    saveQuestion: Function;
    history: any;
};

interface State {
    option1: string;
    option2: string;
};

class AddQuestion extends PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            option1: '11',
            option2: '22',
        }
    }

    postQuestion = () => {
        const {currentUser, users, saveQuestion, postQuestion, history} = this.props;
        const {option1, option2} = this.state;
        const userDetails = users[currentUser];
        const id = Math.random().toString(36).substr(2, 9);

        if(!userDetails) return;

        saveQuestion({
            id,
            option1,
            option2,
            author: currentUser,
            authorProfile: userDetails.profile,
        });
        postQuestion({
            username: currentUser,
            questionId: id,
        });
        history.push("/");
    }

    handleChange = (option: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let { option1, option2 } = this.state;
        
        if(option === 1)
            option1 = event.target.value;
        else if(option === 2)
            option2 = event.target.value;

        this.setState({option1, option2});
    };

    render() {
        const { option1, option2 } = this.state;
        
        return (
            <Card className='addCard'>
                <CardContent>
                    <div className='addContent'>
                        <Typography color="textSecondary">
                            Would you rather
                        </Typography>      
                        <TextField
                            id="outlined-name"
                            label="Option 1"
                            className='option'
                            value={option1}
                            onChange={this.handleChange(1)}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Option 2"
                            className='option'
                            value={option2}
                            onChange={this.handleChange(2)}
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button color="primary" className='submit'
                            variant="contained" onClick={this.postQuestion}>
                            Submit
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default connect(
    (state: any) => ({
        currentUser: state.user.currentUser,
        users: state.user.users,
    }),
    {
        postQuestion,
        saveQuestion,
    },
)(AddQuestion);
