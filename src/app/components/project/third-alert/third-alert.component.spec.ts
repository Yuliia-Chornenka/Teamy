import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdAlertComponent } from './third-alert.component';

describe('ThirdAlertComponent', () => {
  let component: ThirdAlertComponent;
  let fixture: ComponentFixture<ThirdAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
