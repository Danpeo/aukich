import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomSlotComponent } from './random-slot.component';

describe('RandomSlotComponent', () => {
  let component: RandomSlotComponent;
  let fixture: ComponentFixture<RandomSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomSlotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
