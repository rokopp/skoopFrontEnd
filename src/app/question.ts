export interface Question {
  setId: number;
  id: number;
  question: string;
  multiple_choices: Array<string>;
  answer: string;
  points: number;
}
