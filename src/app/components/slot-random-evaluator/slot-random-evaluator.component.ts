import {Component, Input, OnDestroy} from '@angular/core';
import {Slot} from "../../entities/slot";
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {SlotService} from "../../services/slot.service";

@Component({
  selector: 'app-slot-random-evaluator',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgStyle
  ],
  templateUrl: './slot-random-evaluator.component.html',
  styleUrl: './slot-random-evaluator.component.css'
})
export class SlotRandomEvaluatorComponent implements OnDestroy {
  @Input({required: true}) slots: Slot[] = [];
  @Input() crossInterval: number = 500;
  @Input() maxSlotFontSizePx: number = 60;
  @Input() minimalSlotFontSizePx: number = 14;

  crossedSlotIndexes: number[] = [];

  private crossIntervalId: any;

  constructor(private readonly slotService: SlotService) {
  }


  ngOnDestroy(): void {
    this.clearCrossInterval();
  }

  startCrossing() {
    this.crossIntervalId = setInterval(() => this.crossRandom(), this.crossInterval);
    this.calcFontSize();
  }

  reset() {
    for (let slot of this.slots) {
      slot.isCrossed = false;
    }
    this.crossedSlotIndexes = [];
    this.slotService.update(this.slots);
  }

  crossRandom() {
    if (this.crossedSlotIndexes.length + 1 >= this.slots.length) {
      this.clearCrossInterval();
      return;
    }

    const remainingSlots = this.slots
      .filter((_, i) => !this.crossedSlotIndexes.includes(i));

    const totalAmount = this.getTotalAmount(remainingSlots);
    const randomValue = Math.random() * totalAmount;

    let cumulativeAmount = 0;
    let randomSlot: number = 0;

    for (let i = 0; i < remainingSlots.length; i++) {
      cumulativeAmount += remainingSlots[i].amount;

      if (randomValue <= cumulativeAmount) {
        randomSlot = this.slots.indexOf(remainingSlots[i]);
        break;
      }
    }

    this.crossedSlotIndexes.push(randomSlot);
    this.slots[randomSlot].isCrossed = true;
  }

  clearCrossInterval() {
    if (this.crossIntervalId) {
      clearInterval(this.crossIntervalId);
    }
  }

  calcFontSize() {
    const maxAmount = this.slotService.getMaxAmountSlot().amount;

    for (let slot of this.slots) {
      const newSize = this.maxSlotFontSizePx * (slot.amount / maxAmount);
      slot.fontSize = newSize >= this.minimalSlotFontSizePx ? newSize : this.minimalSlotFontSizePx;
      console.log(slot.fontSize);
    }
  }

  private getTotalAmount(remainingSlots: Slot[]) {
    return remainingSlots.reduce((total, slot) => total + slot.amount, 0);
  }
}
