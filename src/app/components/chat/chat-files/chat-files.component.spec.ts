import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFilesComponent } from './chat-files.component';

describe('ChatFilesComponent', () => {
  let component: ChatFilesComponent;
  let fixture: ComponentFixture<ChatFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
