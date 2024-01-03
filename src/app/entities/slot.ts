import {Entity} from "./entity";

export class Slot extends Entity {
  name: string = '';
  amount: number = 0;
  color: string = '';
  isCrossed: boolean = false;
  fontSize: number = 42;
  width: number = 0; // Добавьте свойство для ширины
  height: number = 0; // Добавьте свойство для высоты

  constructor(name: string = '', amount: number = 0, color: string = '#000000') {
    super();
    this.name = name;
    this.amount = amount;
    this.color = color;
  }
}
