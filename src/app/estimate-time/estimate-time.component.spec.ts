import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateTimeComponent } from './estimate-time.component';

describe('EstimateTimeComponent', () => {
  let component: EstimateTimeComponent;
  let fixture: ComponentFixture<EstimateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
