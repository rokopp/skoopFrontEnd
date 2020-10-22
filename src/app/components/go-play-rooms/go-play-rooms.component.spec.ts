import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoPlayRoomsComponent } from './go-play-rooms.component';

describe('GoPlayRoomsComponent', () => {
  let component: GoPlayRoomsComponent;
  let fixture: ComponentFixture<GoPlayRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoPlayRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoPlayRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
