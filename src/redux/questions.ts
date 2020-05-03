import { SAVE_ANSWER, SAVE_NEW_QUESTION } from '../actions/questions';

interface questionDetails {
    option1: string;
    option2: string;
    option1VotedUsers: string[];
    option2VotedUsers: string[];
}

interface Action {
  type?: string;
  result?: any;
};

interface questionDetailsProps {
    [key: string]: questionDetails
}

interface InitialState {
    questions: questionDetailsProps;
};

const initialState: InitialState = {
    questions: {
        '4qbl54shl': {   
            option1: 'Be a Superhero',
            option2: 'Be a SuperVillain',
            option1VotedUsers: ['Rock', 'Cena'],
            option2VotedUsers: ['Undertaker', 'Brock'],
        },
        '5l584cwfu': {   
            option1: 'Be a Whale',
            option2: 'Be an Elephant',
            option1VotedUsers: ['Brock'],
            option2VotedUsers: ['Cena', 'Rock'],
        },
        '2psqkh63k': {   
            option1: 'Be a Star',
            option2: 'Be a Planet',
            option1VotedUsers: ['Austin', 'Brock'],
            option2VotedUsers: ['Undertaker'],
        },
        '226tfbci8': {   
            option1: 'Be a Shirt',
            option2: 'Be a Pant',
            option1VotedUsers: [],
            option2VotedUsers: ['Austin'],
        },
        'jrhp9txwh': {   
            option1: 'Be a Bacteria',
            option2: 'Be a Virus',
            option1VotedUsers: ['Rock'],
            option2VotedUsers: ['Undertaker', 'Austin'],
        },
    }
};

export default function reducer(
    state = initialState,
    action: Action = {}
  ): InitialState {
    switch (action.type) {
        case SAVE_ANSWER: {
            const username = action.result.username;
            let questions = {...state.questions};
            let question = questions[action.result.id];
            if(action.result.selectedOption === 1) {
                if(!question.option1VotedUsers.includes(username)) {
                    question.option1VotedUsers.push(username);
                }
            } else {
                if(!question.option2VotedUsers.includes(username)) {
                    question.option2VotedUsers.push(username);
                }
            }
            return {
                ...state,
                questions,
            }; 
        }

        case SAVE_NEW_QUESTION: {
            const id = Math.random().toString(36).substr(2, 9);
            const question = { 
                option1: action.result.option1,
                option2: action.result.option2,
                option1VotedUsers: [],
                option2VotedUsers: [],
            }
            let questions = {...state.questions};
            questions[id] = question;
            return {
                ...state,
                questions,
            }; 
        }

        default:
            return state;
    }
}
