import { SET_CURRENT_USER, QUESTION_POSTED, ANSWER_POSTED } from '../actions/user';

interface userDetails {
    answeredQuestions: number;
    postedQuestions: number;
    answeredQuestionIds: string[];
    postedQuestionIds: string[];
}

interface Action {
  type?: string;
  result?: any;
};

interface UserDetailsProps {
    [key: string]: userDetails
}
interface InitialState {
    currentUser: string;
    users: UserDetailsProps
};

const initialState: InitialState = {
    currentUser: '',
    users: {
        'Undertaker': {
            answeredQuestions: 0,
            postedQuestions: 0,
            answeredQuestionIds: [],
            postedQuestionIds: [],
        },
        'Brock': {
            answeredQuestions: 0,
            postedQuestions: 0,
            answeredQuestionIds: [],
            postedQuestionIds: [],
        },
        'Austin': {
            answeredQuestions: 0,
            postedQuestions: 0,
            answeredQuestionIds: [],
            postedQuestionIds: [],
        },
        'Cena': {
            answeredQuestions: 0,
            postedQuestions: 0,
            answeredQuestionIds: [],
            postedQuestionIds: [],
        },
        'Rock': {
            answeredQuestions: 0,
            postedQuestions: 0,
            answeredQuestionIds: [],
            postedQuestionIds: [],
        }
    }
};

export default function reducer(
    state = initialState,
    action: Action = {}
  ): InitialState {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          currentUser: action.result,
        }; 
        case QUESTION_POSTED: {
            let users = {...state.users};
            let userDetails = users[action.result.username];
            userDetails.postedQuestions++;
            userDetails.postedQuestionIds.push(action.result.questionId);
            return {
                ...state,
                users,
            }; 
        }
        case ANSWER_POSTED: {
            let users = {...state.users};
            let userDetails = users[action.result.username];
            userDetails.answeredQuestions++;
            userDetails.answeredQuestionIds.push(action.result.questionId);
            return {
                ...state,
                users,
            }; 
        }
        default:
            return state;
    }
}