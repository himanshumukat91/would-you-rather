import { SAVE_ANSWER, SAVE_NEW_QUESTION } from '../actions/questions';

interface questionDetails {
    id: string;
    option1: string;
    option2: string;
    option1VotedUsers: string[];
    option2VotedUsers: string[];
    author: string;
    authorProfile: string;
}

interface Action {
  type?: string;
  result?: any;
};

interface InitialState {
    questions: questionDetails[];
};

const initialState: InitialState = {
    questions: [
        {   
            id: '4qbl54shl',
            option1: 'Be a Superhero',
            option2: 'Be a SuperVillain',
            option1VotedUsers: ['Cena'],
            option2VotedUsers: ['Undertaker', 'Brock'],
            author: 'Undertaker',
            authorProfile: 'https://i.picsum.photos/id/201/100/100.jpg',
        },
        {   
            id: '5l584cwfu',
            option1: 'Be a Whale',
            option2: 'Be an Elephant',
            option1VotedUsers: ['Brock'],
            option2VotedUsers: ['Cena', 'Rock'],
            author: 'Brock',
            authorProfile: 'https://i.picsum.photos/id/202/100/100.jpg',
        },
        {   
            id: '2psqkh63k',
            option1: 'Be a Star',
            option2: 'Be a Planet',
            option1VotedUsers: ['Austin', 'Brock'],
            option2VotedUsers: ['Undertaker'],
            author: 'Austin',
            authorProfile: 'https://i.picsum.photos/id/203/100/100.jpg',
        },
        {   
            id: '226tfbci8',
            option1: 'Be a Shirt',
            option2: 'Be a Pant',
            option1VotedUsers: [],
            option2VotedUsers: ['Austin'],
            author: 'Cena',
            authorProfile: 'https://i.picsum.photos/id/204/100/100.jpg',
        },
        {  
            id: 'jrhp9txwh', 
            option1: 'Be a Bacteria',
            option2: 'Be a Virus',
            option1VotedUsers: ['Rock', 'Cena'],
            option2VotedUsers: ['Undertaker'],
            author: 'Cena',
            authorProfile: 'https://i.picsum.photos/id/204/100/100.jpg',
        },
    ]
};

export default function reducer(
    state = initialState,
    action: Action = {}
  ): InitialState {
    switch (action.type) {
        case SAVE_ANSWER: {
            const username = action.result.username;
            let questions = [...state.questions];
            let question = questions.find(q => q.id === action.result.id);

            if(!question)
                return {...state};

            //Blindly remove username from both arrays if present
            {
                const index = question.option1VotedUsers.indexOf(username);
                if (index !== -1) question.option1VotedUsers.splice(index, 1);    
            }
            {
                const index = question.option2VotedUsers.indexOf(username);
                if (index !== -1) question.option2VotedUsers.splice(index, 1);    
            }

            if(action.result.selectedOption === 1) {
                question.option1VotedUsers.push(username);
            } else {
                question.option2VotedUsers.push(username);
            }
            return {
                ...state,
                questions,
            }; 
        }

        case SAVE_NEW_QUESTION: {
            const question = { 
                id: action.result.id,
                option1: action.result.option1,
                option2: action.result.option2,
                option1VotedUsers: [],
                option2VotedUsers: [],
                author: action.result.author,
                authorProfile: action.result.authorProfile,
            }
            let questions = [...state.questions];
            questions.push(question);
            return {
                ...state,
                questions,
            }; 
        }

        default:
            return state;
    }
}
