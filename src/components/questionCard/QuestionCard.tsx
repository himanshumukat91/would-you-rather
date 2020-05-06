import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import './QuestionCard.css';

import {QuestionDetails} from '../../interfaces/questionInterface';

interface Props { 
    questionDetails: QuestionDetails,
    currentUser: string,
    postAnswer: Function,
    detailedView: boolean,
    users: any;
}

interface State {
    question: QuestionDetails;
};

class QuestionCard extends PureComponent<Props, State> {
    render() {
        const {
            questionDetails,
            currentUser,
            postAnswer,
            detailedView,
            users
        } = this.props;
        const authorDetails = users[questionDetails.author];
        const currUserDetails = users[currentUser];

        const option1Votes = questionDetails.optionOne.votes.length;
        const option2Votes = questionDetails.optionTwo.votes.length;
        const totalVotes = option1Votes + option2Votes;
        const option1String = 
            `(${option1Votes}, ${Math.round((option1Votes/totalVotes)*100)}%)`;
        const option2String = 
            `(${option2Votes}, ${Math.round((option2Votes/totalVotes)*100)}%)`;
    
        let selectedOption = currUserDetails.answers[questionDetails.id];
    
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            postAnswer(questionDetails.id, event.target.value);
        };
    
        return (
            <Card key={questionDetails.id} className='card'>
                <CardContent>
                    {detailedView
                    ?<div className='profileContainer'>
                        <img src={authorDetails.avatarURL} alt={authorDetails.name} 
                            className='profileImage'/>
                        <Typography variant="subtitle1" color="textSecondary" className='profileText'>
                            {authorDetails.name}
                        </Typography>
                    </div>
                    :null}
                    <Typography color="textSecondary">
                        Would you rather
                    </Typography>
                </CardContent>
                <CardActions>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="options" name="options" 
                            value={selectedOption} onChange={handleChange}>
                            <FormControlLabel value={'optionOne'} control={<Radio />} 
                                label={`${questionDetails.optionOne.text} ${selectedOption?option1String:''}`} />
                            <FormControlLabel value={'optionTwo'} control={<Radio />} 
                                label={`${questionDetails.optionTwo.text} ${selectedOption?option2String:''}`} />
                        </RadioGroup>
                    </FormControl>
                </CardActions>
            </Card>
        );
    }
}

export default connect(
    (state: any) => ({
        users: state.user.users,
    }),
    {
    },
)(QuestionCard);