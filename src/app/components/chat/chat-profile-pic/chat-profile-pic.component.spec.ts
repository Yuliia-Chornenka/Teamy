import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatProfilePicComponent } from './chat-profile-pic.component';

describe('ChatProfilePicComponent', () => {
  let component: ChatProfilePicComponent;
  let fixture: ComponentFixture<ChatProfilePicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatProfilePicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
