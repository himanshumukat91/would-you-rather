import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import QuestionCard from '../questionCard/QuestionCard';
import './Questions.css';

import { saveAnswer } from '../../actions/questions';


interface optionDetails {
    votes: string[],
    text: string,
}

interface questionDetails {
    id: string,
    author: string,
    timestamp: number,
    optionOne: optionDetails,
    optionTwo: optionDetails
}

interface questionProps {
    [key: string]: questionDetails
}
interface Props {
    currentUser: string;
    questions: questionProps;
    saveAnswer: Function;
    match: any;
    users: any;
};

interface State {
    question: questionDetails;
};

class Questions extends PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            question: {
                id: '',
                author: '',
                timestamp: 0,
                optionOne: {
                    votes: [],
                    text: '',
                },
                optionTwo: {
                    votes: [],
                    text: '',
                }}
        }
    }

    postAnswer = (id: string, option: string) => {
        const {currentUser, saveAnswer} = this.props;
        
        saveAnswer({
            authedUser: currentUser,
            qid: id,
            answer: option
        });
    }

    componentDidMount() {
        const { match, questions } = this.props;
        let question = null;
        if(match?.params?.questionId) {
            question = questions[match.params.questionId];
            question && this.setState({question});
        }
    }

    render() {
        const { currentUser } = this.props;
        const { question } = this.state;

        if(!question?.id) return null;

        return (
            <div className='questionsContainer'>
                <QuestionCard
                    questionDetails={question}
                    currentUser={currentUser}
                    postAnswer={this.postAnswer}
                    detailedView={true} />
            </div>
        );
    }
}

export default connect(
    (state: any) => ({
        currentUser: state.user.currentUser,
        users: state.user.users,
        questions: state.questions.questions,
    }),
    {
        saveAnswer,
    },
)(Questions);
