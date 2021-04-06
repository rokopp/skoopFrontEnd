export interface Team{
  id: number;
  teamName: string;
  teamMembers: string;
  startTime: string;
  endTime: string;
  location: string;
  score: number;
  activeId: number;
  visitedPointIds: number[];
}
