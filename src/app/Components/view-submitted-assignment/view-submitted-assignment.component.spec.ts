import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubmittedAssignmentComponent } from './view-submitted-assignment.component';

describe('ViewSubmittedAssignmentComponent', () => {
  let component: ViewSubmittedAssignmentComponent;
  let fixture: ComponentFixture<ViewSubmittedAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSubmittedAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubmittedAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
