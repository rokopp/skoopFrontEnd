export interface MultipleChoice{
  id: number;
  questionSetId: number;
  type: string;
  pointsTrue: number;
  pointsFalse: number;
  questionText: string;
  choices: string[];
  answer: string;
}
