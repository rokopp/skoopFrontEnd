import { ActivatedRoute, Router } from '@angular/router';
import { ActiveRoom } from './../../activeroom';
import { ActiveRoomsService } from './../../services/active-rooms.service';
import { Component, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-go-play-rooms',
  templateUrl: './go-play-rooms.component.html',
  styleUrls: ['./go-play-rooms.component.css', '../../app.component.css']
})
export class GoPlayRoomsComponent implements OnInit {
  activeRoom: ActiveRoom;
  joinCode = '';
  teamName = 'Test';
  teams: Array<any> = [
    {
      name: 'Russia',
    },
    {
      name: 'Canada',
    },
    {
      name: 'United States',
    },
    {
      name: 'China',
    }
  ];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              public bgService: BackgroundImageChangeService,
              public acService: ActiveRoomsService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.joinCode = params.joincode;
        this.acService.getActiveGameByJoinCode(this.joinCode).subscribe(room => {
          this.activeRoom = room;
          console.log(this.activeRoom);
        })
      });
  }
  registerTeam(): void{
    // TODO Add team registration
  }
  goPlay(): void{
    // TODO Check If in a team
    this.router.navigate(['mang/' + this.joinCode + '/' + this.teamName]);
  }



}
