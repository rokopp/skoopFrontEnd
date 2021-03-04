import { Component, OnInit } from '@angular/core';
import {BackgroundImageChangeService} from '../../services/background-image-change.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css', '../../app.component.css']
})
export class GreetingComponent implements OnInit {
  public myItems;
  constructor(public bgService: BackgroundImageChangeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.snapshot.data.itemsList
      .subscribe(res => {
        console.log({ res });
        this.myItems = res;
      });
  }
}
