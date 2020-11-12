export interface Question {
  setId: number;
  id: number;
  question: string;
  choices: Array<string>;
  answer: string;
  points: number;
}
