import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import QuestionCard from '../QuestionCard/QuestionCard';
import './Home.css';

import { setCurrentUser, postQuestion, postAnswer } from '../../actions/user';
import { saveAnswer, saveQuestion } from '../../actions/questions';

interface questionDetails {
    option1: string;
    option2: string;
    option1VotedUsers: string[];
    option2VotedUsers: string[];
}

interface questionDetailsProps {
    [key: string]: questionDetails
}

interface Props {
    currentUser: string;
    questions: questionDetailsProps;
    setCurrentUser: Function;
    postQuestion: Function;
    postAnswer: Function;
    saveAnswer: Function;
    saveQuestion: Function;
};

interface State {
    questionType: string;
};

class Home extends PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            questionType: "Unanswered"
      }
    }

    postAnswer = (id: string, option: string) => {
        const {currentUser, saveAnswer, postAnswer} = this.props;
        
        saveAnswer({
            username: currentUser,
            id,
            selectedOption: Number(option)
        });
        postAnswer({
            username: currentUser,
            questionId: id,
        });
    }

    handleQuesTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            questionType: event.target.value,
        })
      };

    render() {
        const { setCurrentUser, currentUser, questions } = this.props;
        const { questionType } = this.state;
        const questionIds = Object.keys(questions);

        return (
            <div className='homeContainer'>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            WOULD YOU RATHER
                        </Typography>
                        <AccountCircle className='homeUsername'/>
                        <Typography variant="subtitle2">
                            {currentUser}
                        </Typography>
                        <Button color="inherit" className='homeLogout'
                        onClick={() => setCurrentUser('')}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className='questionContainer'>
                    {(questionIds || []).map(id => (
                        <div className='questionCard'>
                            {QuestionCard( 
                                id,
                                questions[id],
                                currentUser,
                                questionType,
                                this.postAnswer)}
                        </div>
                    ))}
                </div>
                <div className='questionTypeContainer'>
                    <FormControl component="fieldset">
                        <RadioGroup row aria-label="options" name="options" value={questionType} onChange={this.handleQuesTypeChange}>
                            <FormControlLabel value={"Unanswered"} control={<Radio />} label={"Unanswered"} />
                            <FormControlLabel value={"Answered"} control={<Radio />} label={"Answered"} />
                            <FormControlLabel value={"All"} control={<Radio />} label={"All"} />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        currentUser: state.user.currentUser,
        questions: state.questions.questions,
    }),
    {
        setCurrentUser,
        postQuestion,
        postAnswer,
        saveAnswer,
        saveQuestion,
    },
)(Home);
