import {SET_CURRENT_USER} from '../actions/user';

interface userDetails {
    name: string;
    questionsPosted: number;
    questionsAnswered: number;
    answers: answer;
    questionIds: string[];
}

interface Action {
  type?: string;
  result?: any;
};

interface answer {
    [key: string]: number;
}

interface InitialState {
    currentUser: string;
    users: userDetails[]
};

const initialState: InitialState = {
    currentUser: '',
    users: [
        {
            name: 'Undertaker',
            questionsPosted: 0,
            questionsAnswered: 0,
            answers: {},
            questionIds: [''],
        },
        {
            name: 'Brock Lesnar',
            questionsPosted: 0,
            questionsAnswered: 0,
            answers: {},
            questionIds: [''],
        },
        {
            name: 'Rock',
            questionsPosted: 0,
            questionsAnswered: 0,
            answers: {},
            questionIds: [''],
        }
    ]
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
    default:
        return state;
    }
}