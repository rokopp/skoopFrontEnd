export interface Question {
  questionSetId: number;
  id: number;
  question: string;
  choices: string[];
  answer: string;
  points: number;
}
