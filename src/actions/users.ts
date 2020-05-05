export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const QUESTION_POSTED = 'QUESTION_POSTED';
export const ANSWER_POSTED = 'ANSWER_POSTED';

interface postDetails {
    username: string;
    questionId: string;
}

export function setCurrentUser(username: string){
  return {
    type: SET_CURRENT_USER,
    result: username
  }
}

export function postQuestion(details: postDetails){
  return {
    type: QUESTION_POSTED,
    result: details
  }
}

export function postAnswer(details: postDetails){
  return {
    type: ANSWER_POSTED,
    result: details
  }
}