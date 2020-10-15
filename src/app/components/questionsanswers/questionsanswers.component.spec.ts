import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsanswersComponent } from './questionsanswers.component';

describe('QuestionsanswersComponent', () => {
  let component: QuestionsanswersComponent;
  let fixture: ComponentFixture<QuestionsanswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsanswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsanswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
