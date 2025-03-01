import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css',
})
export class EditTodoComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}
  todos: string[] = [];
  editedTodo: string = '';
  editingIndex: number | null = null;

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    const savedTodos = this.localStorageService.getItem<string[]>('todos');
    if (savedTodos) {
      this.todos = savedTodos;
    }
  }

  startEditing(index: number) {
    this.editingIndex = index;
    this.editedTodo = this.todos[index];
  }

  saveEdit() {
    if (this.editingIndex !== null && this.editedTodo.trim()) {
      this.todos[this.editingIndex] = this.editedTodo;
      this.localStorageService.setItem('todos', this.todos);
      this.editingIndex = null;
    }
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  delete(index: number): void {
    if (!this.todos) return;
    if (confirm('Are you sure you want to delete this to-do?')) {
      this.todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
}
