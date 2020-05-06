export interface OptionDetails {
    votes: string[],
    text: string,
}

export interface QuestionDetails {
    id: string,
    author: string,
    timestamp: number,
    optionOne: OptionDetails,
    optionTwo: OptionDetails
}