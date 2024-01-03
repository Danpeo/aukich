import {Injectable} from '@angular/core';
import {Slot} from "../entities/slot";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private readonly slotsKey: string = "slots";
  slots: Slot[] = [];

  constructor(private readonly localStorageService: LocalStorageService<Slot>) {
    this.slots = localStorageService.loadFromStorage(this.slotsKey);
  }

  createNew(slot: Slot) {
    this.slots.push(slot);
    this.localStorageService.saveToLocalStorage(this.slotsKey, this.slots);
  }

  update(slots: Slot[]) {
    this.localStorageService.saveToLocalStorage(this.slotsKey, slots);
  }

  getMaxAmountSlot(): Slot {
    return this.slots
      .reduce((max, current) => (current.amount > max.amount ? current : max), this.slots[0]);
  }
}
