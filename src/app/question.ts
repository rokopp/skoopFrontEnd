export interface Question {
  questionSetId: number;
  id: number;
  question: string;
  choices: Array<string>;
  answer: string;
  points: number;
}
