import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import QuestionCard from '../questionCard/QuestionCard';
import NoMatch from '../noMatch/NoMatch';
import './Questions.css';

import {QuestionDetails} from '../../interfaces/questionInterface';
import { saveAnswer } from '../../actions/questions';

interface QuestionProps {
    [key: string]: QuestionDetails
}
interface Props {
    currentUser: string;
    questions: QuestionProps;
    saveAnswer: Function;
    match: any;
};

interface State {
    question: any;
};

class Questions extends PureComponent<Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
            question: {}
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

        if(!question?.id) return <NoMatch />;

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
        questions: state.questions.questions,
    }),
    {
        saveAnswer,
    },
)(Questions);
