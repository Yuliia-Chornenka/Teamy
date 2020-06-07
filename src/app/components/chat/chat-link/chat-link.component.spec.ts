import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLinkComponent } from './chat-link.component';

describe('ChatLinkComponent', () => {
  let component: ChatLinkComponent;
  let fixture: ComponentFixture<ChatLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
