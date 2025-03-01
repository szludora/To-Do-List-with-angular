import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  addItem(todo: { desc: string; status: boolean }): void {
    let todos =
      this.getItem<{ [key: number]: { desc: string; status: boolean } }>(
        'todos'
      ) || {};

    const id = Math.max(0, ...Object.keys(todos).map(Number)) + 1;

    todos[id] = { desc: todo.desc, status: todo.status };
    this.setItem('todos', todos);
  }

  getAllItems(): { id: number; desc: string; status: boolean }[] {
    let todos =
      this.getItem<{ [key: number]: { desc: string; status: boolean } }>(
        'todos'
      ) || {};
    return Object.keys(todos).map((key) => ({
      id: Number(key),
      ...todos[Number(key)],
    }));
  }
}
