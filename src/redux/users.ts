import { SET_CURRENT_USER, QUESTION_POSTED, ANSWER_POSTED } from '../actions/users';

interface userDetails {
    profile: string;
    questionsAnswered: number;
    questionsPosted: number;
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
    currentUser: any;
    users: UserDetailsProps
};

const initialState: InitialState = {
    currentUser: null,
    users: {
        'Undertaker': {
            profile: 'https://i.picsum.photos/id/201/100/100.jpg',
            questionsAnswered: 2,
            questionsPosted: 1,
            answeredQuestionIds: ['4qbl54shl', '2psqkh63k', 'jrhp9txwh'],
            postedQuestionIds: ['4qbl54shl'],
        },
        'Brock': {
            profile: 'https://i.picsum.photos/id/202/100/100.jpg',
            questionsAnswered: 3,
            questionsPosted: 1,
            answeredQuestionIds: ['4qbl54shl', '5l584cwfu', '2psqkh63k'],
            postedQuestionIds: ['5l584cwfu'],
        },
        'Austin': {
            profile: 'https://i.picsum.photos/id/203/100/100.jpg',
            questionsAnswered: 2,
            questionsPosted: 1,
            answeredQuestionIds: ['2psqkh63k', '226tfbci8'],
            postedQuestionIds: ['2psqkh63k'],
        },
        'Cena': {
            profile: 'https://i.picsum.photos/id/204/100/100.jpg',
            questionsAnswered: 3,
            questionsPosted: 2,
            answeredQuestionIds: ['4qbl54shl', '5l584cwfu', 'jrhp9txwh'],
            postedQuestionIds: ['226tfbci8', 'jrhp9txwh'],
        },
        'Rock': {
            profile: 'https://i.picsum.photos/id/301/100/100.jpg',
            questionsAnswered: 2,
            questionsPosted: 0,
            answeredQuestionIds: ['5l584cwfu', 'jrhp9txwh'],
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
            const questionId = action.result.questionId;
            if(!userDetails.postedQuestionIds.includes(questionId)) {
                userDetails.questionsPosted++;
                userDetails.postedQuestionIds.push(questionId);
            }
            return {
                ...state,
                users,
            }; 
        }
        case ANSWER_POSTED: {
            let users = {...state.users};
            let userDetails = users[action.result.username];
            const questionId = action.result.questionId;
            if(!userDetails.answeredQuestionIds.includes(questionId)) {
                userDetails.questionsAnswered++;
                userDetails.answeredQuestionIds.push(questionId);
            }
            return {
                ...state,
                users,
            }; 
        }
        default:
            return state;
    }
}