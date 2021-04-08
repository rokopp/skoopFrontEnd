export interface Question {
  questionSetId: number;
  id: number;
  questionText: string;
  choices: string[];
  answer: string;
  pointsTrue: number;
  pointsFalse: number;
  hint: string;
}
