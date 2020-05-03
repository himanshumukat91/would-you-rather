export const SAVE_ANSWER = 'SAVE_ANSWER';
export const SAVE_NEW_QUESTION = 'SAVE_NEW_QUESTION';

export function saveAnswer(answer:any){
  return {
    type: SAVE_ANSWER,
    result: answer
  }
}

export function saveQuestion(question:any){
  return {
    type: SAVE_NEW_QUESTION,
    result: question
  }
}