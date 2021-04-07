import { Team } from './team';
export interface ActiveRoom {
  id: number;
  joinCode: string;
  roomName: string;
  roomId: number;
  teams: Team[];
  startTime: string;
  endTime: string;
}
