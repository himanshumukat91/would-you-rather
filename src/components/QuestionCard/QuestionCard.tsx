import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import './QuestionCard.css';

interface questionDetails {
    option1: string;
    option2: string;
    option1VotedUsers: string[];
    option2VotedUsers: string[];
}

export default function QuestionCard (
    id: string, 
    questionDetails: questionDetails,
    currentUser: string,
    questionType: string,
    postAnswer: Function,
){
    let selectedOption = null;

    if(questionDetails.option1VotedUsers.includes(currentUser)) {
        selectedOption = 1;
    } else if(questionDetails.option2VotedUsers.includes(currentUser)) {
        selectedOption = 2;
    }

    const option1Votes = questionDetails.option1VotedUsers.length;
    const option2Votes = questionDetails.option2VotedUsers.length;
    const totalVotes = option1Votes + option2Votes;

    const option1String = 
        `(${option1Votes}, ${Math.round((option1Votes/totalVotes)*100)}%)`;
    const option2String = 
        `(${option2Votes}, ${Math.round((option2Votes/totalVotes)*100)}%)`;

    // show only if no option is selected else return
    if(questionType === 'Unanswered' && selectedOption) return null;
    if(questionType === 'Answered' && !selectedOption) return null;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        postAnswer(id, event.target.value);
    };

    return (
        <Card key={id} className='card'>
            <CardContent>
                <Typography color="textSecondary">
                    Would you rather
                </Typography>
            </CardContent>
            <CardActions>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="options" name="options" value={selectedOption} onChange={handleChange}>
                        <FormControlLabel value={1} control={<Radio />} label={`${questionDetails.option1} ${selectedOption?option1String:''}`} />
                        <FormControlLabel value={2} control={<Radio />} label={`${questionDetails.option2} ${selectedOption?option2String:''}`} />
                    </RadioGroup>
                </FormControl>
            </CardActions>
        </Card>
    );
}