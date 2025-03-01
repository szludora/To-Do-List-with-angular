import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
})
export class EditTodoComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}

  todos: { desc: string; status: boolean }[] = [];
  editedTodo: string = '';
  editingIndex: number | null = null;

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.localStorageService.getAllItems().map((todo) => todo);
  }

  startEditing(index: number) {
    this.editingIndex = index;
    this.editedTodo = this.todos[index].desc;
  }

  saveEdit() {
    if (this.editingIndex !== null && this.editedTodo.trim()) {
      this.todos[this.editingIndex].desc = this.editedTodo;
      this.localStorageService.setItem('todos', this.todos);
      this.editingIndex = null;
      this.editedTodo = '';
    }
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editedTodo = '';
  }

  delete(index: number): void {
    if(this.todos[index].status === false){
      if (confirm('Are you sure you want to delete this to-do?')) {
        this.todos.splice(index, 1);
        this.localStorageService.setItem('todos', this.todos);
      }
    }
  }

  changeStatus(key: number) {
    this.todos[key].status = !this.todos[key].status;
    this.localStorageService.setItem('todos', this.todos);
  }
}
