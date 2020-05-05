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
    id: string;
    option1: string;
    option2: string;
    option1VotedUsers: string[];
    option2VotedUsers: string[];
    author: string;
    authorProfile: string;
}

interface props { 
    questionDetails: questionDetails,
    currentUser: string,
    questionType: string,
    postAnswer: Function,
    detailedView: boolean,
}

export default function QuestionCard (props: props){
    const {
        questionDetails,
        currentUser,
        postAnswer,
        detailedView
    } = props;

    const option1Votes = questionDetails.option1VotedUsers.length;
    const option2Votes = questionDetails.option2VotedUsers.length;
    const totalVotes = option1Votes + option2Votes;

    const option1String = 
        `(${option1Votes}, ${Math.round((option1Votes/totalVotes)*100)}%)`;
    const option2String = 
        `(${option2Votes}, ${Math.round((option2Votes/totalVotes)*100)}%)`;

    let selectedOption = 0;
    if(questionDetails.option1VotedUsers.includes(currentUser)) {
        selectedOption = 1;
    } else if(questionDetails.option2VotedUsers.includes(currentUser)) {
        selectedOption = 2;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        postAnswer(questionDetails.id, event.target.value);
    };

    return (
        <Card key={questionDetails.id} className='card'>
            <CardContent>
                {detailedView
                ?<div className='profileContainer'>
                    <img src={questionDetails.authorProfile} alt={questionDetails.author} 
                        className='profileImage'/>
                    <Typography variant="subtitle1" color="textSecondary" className='profileText'>
                        {questionDetails.author}
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
                        <FormControlLabel value={1} control={<Radio />} 
                            label={`${questionDetails.option1} ${selectedOption?option1String:''}`} />
                        <FormControlLabel value={2} control={<Radio />} 
                            label={`${questionDetails.option2} ${selectedOption?option2String:''}`} />
                    </RadioGroup>
                </FormControl>
            </CardActions>
        </Card>
    );
}