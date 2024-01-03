import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService<T> {

  constructor() {
  }

  saveToLocalStorage(storageKey: string, items: T[]): void {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  loadFromStorage(storageKey: string): T[] {
    const storedItems = localStorage.getItem(storageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }
}
