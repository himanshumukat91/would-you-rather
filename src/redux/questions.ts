import { 
    GET_QUESTIONS_SUCCESS, 
    SAVE_ANSWER_SUCCESS, 
    SAVE_QUESTION_SUCCESS
} from '../actions/questions';
import {QuestionDetails} from '../interfaces/questionInterface';

interface questionDeialsProps {
    [key: string]: QuestionDetails
}
interface Action {
  type?: string;
  result?: any;
};

interface InitialState {
    questions: questionDeialsProps;
};

const initialState: InitialState = {
    questions: {}
};

export default function reducer(
    state = initialState,
    action: Action = {}
  ): InitialState {
    switch (action.type) {
        case GET_QUESTIONS_SUCCESS: 
            return {
                ...state,
                questions: action.result,
            }
        case SAVE_ANSWER_SUCCESS: {
            const data = action.result;
            let questions: any = {...state.questions}; //To keep it pure
            let question = questions[data.qid];
            //Blindly remove username from both arrays if present
            {
                const index = question.optionOne.votes.indexOf(data.authedUser);
                if (index !== -1) question.optionOne.votes.splice(index, 1);    
            }
            {
                const index = question.optionTwo.votes.indexOf(data.authedUser);
                if (index !== -1) question.optionTwo.votes.splice(index, 1);    
            }
            question[data.answer].votes.push(data.authedUser);

            return {
                ...state,
                questions
            }
        }
        case SAVE_QUESTION_SUCCESS: {
            const newQuestion = action.result;
            let questions: any = {...state.questions}; //To keep it pure
            questions[newQuestion.id] = newQuestion;

            return {
                ...state,
                questions
            }
        }
        default:
            return state;
    }
}
