import { Router } from '@angular/router';
import { ActiveRoomsService } from './../../services/active-rooms.service';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css', '../../app.component.css']
})
export class RoomComponent implements OnInit {
  @ViewChild('joinCode') joinCode: ElementRef;

  constructor(private router: Router,
              public bgService: BackgroundImageChangeService,
              public acService: ActiveRoomsService
    ) { }

  ngOnInit(): void {
  }
  checkCode(): void{
    this.acService.getActiveGameByJoinCode(this.joinCode.nativeElement.value).subscribe(() => {
      console.log('Good');
      this.router.navigate(['mang/' + this.joinCode.nativeElement.value]);
    },
      error => {
        this.resetCode();
        const errorMessage = error.message;
        console.error('Happened this during deleting: ', errorMessage);
    });
  }
  resetCode(): void{
    this.joinCode.nativeElement.value = '';
  }

}
