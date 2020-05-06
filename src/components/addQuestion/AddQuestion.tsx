import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './AddQuestion.css';

import { saveQuestion } from '../../actions/questions';
import { UserDetails } from '../../interfaces/userInterface';

interface Props {
    saveQuestion: Function;
    history: any;
    userDetails: UserDetails;
};

interface State {
    optionOneText: string;
    optionTwoText: string;
};

class AddQuestion extends PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            optionOneText: '',
            optionTwoText: '',
        }
    }

    postQuestion = () => {
        const {userDetails, saveQuestion, history} = this.props;
        const {optionOneText, optionTwoText} = this.state;

        if(!userDetails) return;

        saveQuestion({
            author: userDetails.id,
            optionOneText,
            optionTwoText,
        });
        history.push("/");
    }

    handleChange = (option: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let { optionOneText, optionTwoText } = this.state;
        
        if(option === 1)
            optionOneText = event.target.value;
        else if(option === 2)
            optionTwoText = event.target.value;

        this.setState({optionOneText, optionTwoText});
    };

    render() {
        const { optionOneText, optionTwoText } = this.state;
        
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
                            value={optionOneText}
                            onChange={this.handleChange(1)}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-name"
                            label="Option 2"
                            className='option'
                            value={optionTwoText}
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
        userDetails: state.user.users[state.user.currentUser],
    }),
    {
        saveQuestion,
    },
)(AddQuestion);
