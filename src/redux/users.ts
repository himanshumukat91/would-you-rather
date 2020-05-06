import { 
    GET_USERS_SUCCESS, 
    SET_CURRENT_USER, 
    POST_ANSWER_SUCCESS,
    POST_QUESTION_SUCCESS
} from '../actions/users';
import {UserDetails} from '../interfaces/userInterface';

interface UserDetailsProps {
    [key: string]: UserDetails
}

interface Action {
  type?: string;
  result?: any;
};

interface InitialState {
    currentUser: any;
    users: UserDetailsProps;
};

const initialState: InitialState = {
    currentUser: null,
    users: {}
};

export default function reducer(
    state = initialState,
    action: Action = {}
  ): InitialState {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.result,
            }
        case SET_CURRENT_USER:
            return {
          ...state,
          currentUser: action.result,
        }; 
        case POST_ANSWER_SUCCESS:{
            const data = action.result;
            let users = {...state.users}; //To keep it pure
            let userDetails = users[data.authedUser];
            userDetails.answers[data.qid] = data.answer;
            return {
                ...state,
                users
            }
        }
        case POST_QUESTION_SUCCESS:{
            const newQuestion = action.result;
            let users = {...state.users}; //To keep it pure
            let userDetails = users[newQuestion.author];
            userDetails.questions.push(newQuestion.id);
            return {
                ...state,
                users
            }
        }
        default:
            return state;
    }
}