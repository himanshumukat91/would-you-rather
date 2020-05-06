import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import QuestionCard from '../questionCard/QuestionCard';
import './Home.css';

import { UserDetails } from '../../interfaces/userInterface';

interface Props {
    questionArray: any[];
    userDetails: UserDetails;
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

    handleQuesTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            questionType: event.target.value,
        })
    };

    render() {
        const { userDetails, questionArray } = this.props;
        const { questionType } = this.state;

        const sortedQuestions = questionArray.sort((a,b) => (
            b.timestamp - a.timestamp
        ));
        const filterQuestions = sortedQuestions.filter(question => {
            const selectedOption = userDetails.answers[question.id];
            // show according to the question type selected
            if(questionType === 'Unanswered' && selectedOption) {
                return false;  
            } 
            else if(questionType === 'Answered' && !selectedOption) {
                return false;
            } else {
                return true;
            }
        });

        return (
            <div className='homeContainer'>
                <div className='questionContainer'>
                    {filterQuestions.length
                    ?filterQuestions.map((question: any) => (
                        <div key={question.id} className='questionCard'>
                            <Link to={`/questions/${question.id}`} className='noTextDecoration'>
                                <QuestionCard
                                    questionDetails={question}
                                    currentUser={userDetails.id}
                                    postAnswer={() => {}}
                                    detailedView={false} />
                            </Link>
                        </div>
                    ))
                    :<Typography variant="h6" color="textSecondary">
                        No New Question Available
                    </Typography>}
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
        questionArray: Object.values(state.questions.questions),
        userDetails: state.user.users[state.user.currentUser],
    }),
    {
    },
)(Home);
