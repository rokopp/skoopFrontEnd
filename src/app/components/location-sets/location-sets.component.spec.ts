import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSetsComponent } from './location-sets.component';

describe('LocationSetsComponent', () => {
  let component: LocationSetsComponent;
  let fixture: ComponentFixture<LocationSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
