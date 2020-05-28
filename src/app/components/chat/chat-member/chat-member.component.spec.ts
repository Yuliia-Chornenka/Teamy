import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMemberComponent } from './chat-member.component';

describe('ChatMemberComponent', () => {
  let component: ChatMemberComponent;
  let fixture: ComponentFixture<ChatMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
