export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const POST_QUESTION_SUCCESS = 'POST_QUESTION_SUCCESS';
export const POST_ANSWER_SUCCESS = 'POST_ANSWER_SUCCESS';

interface postDetails {
    username: string;
    questionId: string;
}

export function getUsers(){
  return {
    type: GET_USERS,
  }
}

export function setCurrentUser(username: string){
  return {
    type: SET_CURRENT_USER,
    result: username
  }
}