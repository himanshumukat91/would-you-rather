import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import QuestionCard from '../questionCard/QuestionCard';
import './Questions.css';

import { postAnswer } from '../../actions/users';
import { saveAnswer } from '../../actions/questions';

interface questionDetails {
    id: string;
    option1: string;
    option2: string;
    option1VotedUsers: string[];
    option2VotedUsers: string[];
    author: string;
    authorProfile: string;
}

interface Props {
    currentUser: string;
    questions: questionDetails[];
    postAnswer: Function;
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
                option1: '',
                option2: '',
                option1VotedUsers: [],
                option2VotedUsers: [],
                author: '',
                authorProfile: '',
            }
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

    componentDidMount() {
        const { match, questions } = this.props;
        let question = null;
        if(match?.params?.questionId) {
            question = questions.find(q => q.id === match.params.questionId);
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
                    questionType={'All'}
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
        postAnswer,
        saveAnswer,
    },
)(Questions);
