import { combineReducers } from 'redux';
import user from './user'
import questions from './questions';

export default combineReducers({
    user,
    questions,
})