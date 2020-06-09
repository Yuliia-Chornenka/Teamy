import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedTeamCardComponent } from './created-team-card.component';

describe('CreatedTeamCardComponent', () => {
  let component: CreatedTeamCardComponent;
  let fixture: ComponentFixture<CreatedTeamCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedTeamCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedTeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
