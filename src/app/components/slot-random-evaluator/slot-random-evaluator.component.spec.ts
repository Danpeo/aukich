import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotRandomEvaluatorComponent } from './slot-random-evaluator.component';

describe('SlotRandomEvaluatorComponent', () => {
  let component: SlotRandomEvaluatorComponent;
  let fixture: ComponentFixture<SlotRandomEvaluatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotRandomEvaluatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlotRandomEvaluatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
