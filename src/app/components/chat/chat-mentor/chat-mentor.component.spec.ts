import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMentorComponent } from './chat-mentor.component';

describe('ChatMentorComponent', () => {
  let component: ChatMentorComponent;
  let fixture: ComponentFixture<ChatMentorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMentorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
