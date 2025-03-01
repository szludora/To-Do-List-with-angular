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
  prevStatus = false;
  stylesMap: { [key: number]: { color: string; 'background-color': string } } =
    {};

  styles = [
    { color: 'black', bg: 'white' },
    { color: 'black', bg: '#B4FFF9' },
    { color: 'black', bg: '#FFF5BF' },
    { color: 'black', bg: '#D2DEFF' },
    { color: 'black', bg: '#D7FFDA' },
    { color: 'black', bg: '#FFC7DA' },
    { color: 'black', bg: '#FFCDB4' },
    { color: 'black', bg: '#FFF1E4' },
    { color: 'black', bg: '#F7E0FF' },
  ];

  ngOnInit() {
    this.loadTodos();
    this.getColor();
  }

  loadTodos() {
    this.todos = this.localStorageService.getAllItems().map((todo) => todo);

    let savedStyles =
      this.localStorageService.getItem<{ [key: number]: any }>('todoStyles') ||
      {};

    this.todos.forEach((_, index) => {
      if (
        (!savedStyles[index] && this.todos[index].status === true) ||
        (savedStyles[index] &&
          savedStyles[index].bg === 'white' &&
          this.todos[index].status === true)
      ) {
        savedStyles[index] = this.getRandomStyle();
      } else if (this.todos[index].status === false) {
        delete savedStyles[index];
      }
    });

    this.localStorageService.setItem('todoStyles', savedStyles);
    this.stylesMap = savedStyles;
  }

  getRandomStyle() {
    const randomIndex =
      Math.floor(Math.random() * (this.styles.length - 1)) + 1;
    const style = this.styles[randomIndex];
    return { color: style.color, 'background-color': style.bg };
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
    if (this.todos[index].status === false) {
      if (confirm('Are you sure you want to delete this to-do?')) {
        this.todos.splice(index, 1);
        this.localStorageService.setItem('todos', this.todos);
      }
    }
  }

  changeStatus(key: number) {
    this.todos[key].status = !this.todos[key].status;
    this.localStorageService.setItem('todos', this.todos);
    this.stylesMap = {};
    this.loadTodos();
  }

  checkAll() {
    for (let todo of this.todos) {
      todo.status = !this.prevStatus;
    }
    this.prevStatus = !this.prevStatus;
    this.localStorageService.setItem('todos', this.todos);
    console.log(this.prevStatus);
    this.stylesMap = {};
    this.loadTodos();
  }

  getColor() {
    this.stylesMap =
      this.localStorageService.getItem<{
        [key: number]: { color: string; 'background-color': string };
      }>('todoStyles') || {};
  }
}
