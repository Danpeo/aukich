import {Component, Input, OnInit} from '@angular/core';
import {Slot} from "../../entities/slot";
import {Random} from "../../utils/random";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-random-slot',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './random-slot.component.html',
  styleUrl: './random-slot.component.css'
})
export class RandomSlotComponent implements OnInit {
  @Input({required: true}) slots: Slot[] = [
    new Slot('Slot 1', 50, Random.generateHexColor()),
    new Slot('Slot 2', 50, Random.generateHexColor()),
    new Slot('Slot 3', 50, Random.generateHexColor())
  ];

  currentSlot: Slot = new Slot();

  ngOnInit() {
    this.changeContentRandomly();
    setInterval(() => this.changeContentRandomly(), 100);
  }

  changeContentRandomly() {
    const totalWeight: number = this.slots.reduce((acc, slot) => acc + slot.amount, 0);
    let randomValue: number = Math.random() * totalWeight;

    for (const slot of this.slots) {
      randomValue -= slot.amount;
      if (randomValue <= 0) {
        this.currentSlot = slot;
        break;
      }
    }
  }
}
