import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAlertComponent } from './first-alert.component';

describe('FirstAlertComponent', () => {
  let component: FirstAlertComponent;
  let fixture: ComponentFixture<FirstAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
