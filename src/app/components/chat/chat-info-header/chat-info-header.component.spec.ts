import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInfoHeaderComponent } from './chat-info-header.component';

describe('ChatInfoHeaderComponent', () => {
  let component: ChatInfoHeaderComponent;
  let fixture: ComponentFixture<ChatInfoHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInfoHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
