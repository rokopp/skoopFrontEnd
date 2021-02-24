export class PairDetail{
  constructor(pairId: number, location: string, question: string){
    this.pairId = pairId;
    this.location = location;
    this.question = question;
  }

  pairId: number;
  location: string;
  question: string;
}
