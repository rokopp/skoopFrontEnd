import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowActivatedRoomComponent } from './show-activated-room.component';

describe('ShowActivatedRoomComponent', () => {
  let component: ShowActivatedRoomComponent;
  let fixture: ComponentFixture<ShowActivatedRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowActivatedRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowActivatedRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
