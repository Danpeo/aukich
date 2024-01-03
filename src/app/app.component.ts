import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {SlotService} from "./services/slot.service";
import {Slot} from "./entities/slot";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {RandomSlotComponent} from "./components/random-slot/random-slot.component";
import {Random} from "./utils/random";
import {SlotRandomEvaluatorComponent} from "./components/slot-random-evaluator/slot-random-evaluator.component";
import {FormSectionComponent} from "./components/form-section/form-section.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, MatSlideToggleModule, MatSidenavModule, MatToolbarModule, MatListModule, RouterLink, ReactiveFormsModule, MatInputModule, FormsModule, RandomSlotComponent, SlotRandomEvaluatorComponent, FormSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AUKICH';

  slots: Slot[] = [];
  slotForm = this.formBuilder.group({
    name: '',
    amount: ''
  });

  constructor(private readonly slotService: SlotService, private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.slots = this.slotService.slots;
  }

  newSlot() {
    let formValue = this.slotForm.value;
    let newSlot = new Slot();

    newSlot.name = formValue.name != null ? formValue.name : '';
    newSlot.amount = formValue.amount != null ? parseFloat(formValue.amount) : 0;
    newSlot.color = Random.generateHexColor();

    this.slotService.createNew(newSlot);
  }

  addPointsToSlot(slot: Slot, amount: string) {
    let numValue = parseFloat(amount);

    if (!isNaN(numValue)) {
      slot.amount += numValue;

      this.updateSlots()
    }
  }

  removeSlots(index: number, qty: number = 1) {
    this.slots.splice(index, qty);

    this.updateSlots();
  }

  setEqualAmountForSlots() {
    const maxAmountSlot = this.slotService.getMaxAmountSlot();

    this.slots.forEach(slot => {
      slot.amount = maxAmountSlot.amount > 0 ? maxAmountSlot.amount : 100;
    });

    this.updateSlots();
  }

  updateSlots() {
    this.slotService.update(this.slots);
  }
}
