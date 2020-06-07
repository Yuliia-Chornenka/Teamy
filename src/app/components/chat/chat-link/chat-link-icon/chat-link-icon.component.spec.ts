import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLinkIconComponent } from './chat-link-icon.component';

describe('ChatLinkIconComponent', () => {
  let component: ChatLinkIconComponent;
  let fixture: ComponentFixture<ChatLinkIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLinkIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLinkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
