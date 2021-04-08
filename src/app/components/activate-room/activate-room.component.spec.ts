import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateRoomComponent } from './activate-room.component';

describe('ActivateRoomComponent', () => {
  let component: ActivateRoomComponent;
  let fixture: ComponentFixture<ActivateRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
