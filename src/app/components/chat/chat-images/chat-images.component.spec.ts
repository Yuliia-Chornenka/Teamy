import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatImagesComponent } from './chat-images.component';

describe('ChatImagesComponent', () => {
  let component: ChatImagesComponent;
  let fixture: ComponentFixture<ChatImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
