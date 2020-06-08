import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondAlertComponent } from './second-alert.component';

describe('SecondAlertComponent', () => {
  let component: SecondAlertComponent;
  let fixture: ComponentFixture<SecondAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
