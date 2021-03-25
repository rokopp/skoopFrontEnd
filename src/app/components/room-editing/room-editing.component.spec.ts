import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditingComponent } from './room-editing.component';

describe('RoomEditingComponent', () => {
  let component: RoomEditingComponent;
  let fixture: ComponentFixture<RoomEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
