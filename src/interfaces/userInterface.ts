export interface AnswerMap {
    [key: string]: string
}

export interface UserDetails {
    id: string,
    name: string,
    avatarURL: string,
    answers: AnswerMap,
    questions: string[]
}