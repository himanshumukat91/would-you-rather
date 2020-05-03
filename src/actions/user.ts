export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(username: string){
  return {
    type: SET_CURRENT_USER,
    result: username
  }
}