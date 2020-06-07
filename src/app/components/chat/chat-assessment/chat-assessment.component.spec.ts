import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAssessmentComponent } from './chat-assessment.component';

describe('ChatAssessmentComponent', () => {
  let component: ChatAssessmentComponent;
  let fixture: ComponentFixture<ChatAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
