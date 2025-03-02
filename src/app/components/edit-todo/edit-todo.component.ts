import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTodoComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  todos: { desc: string; status: boolean; font: string }[] = [];
  editedTodo: string = '';
  editingIndex: number | null = null;
  stylesMap: {
    [key: number]: { color: string; 'background-color': string; font: string };
  } = {};

  styles = [
    { color: 'black', bg: 'white', font: 'sans' },
    { color: 'black', bg: '#B4FFF9', font: 'font-two' },
    { color: 'black', bg: '#FFF5BF', font: 'font-three' },
    { color: 'black', bg: '#D2DEFF', font: 'font-one' },
    { color: 'black', bg: '#D7FFDA', font: 'font-two' },
    { color: 'black', bg: '#FFC7DA', font: 'font-three' },
    { color: 'black', bg: '#FFCDB4', font: 'font-one' },
    { color: 'black', bg: '#FFF1E4', font: 'font-two' },
    { color: 'black', bg: '#F7E0FF', font: 'font-three' },
  ];

  ngOnInit() {
    this.updateStyles();

    this.route.params.subscribe((params) => {
      const index = +params['id'];
      if (!isNaN(index) && this.todos[index]) {
        this.startEditing(index);
      }
    });
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

  updateStyles() {
    this.loadTodos();
    this.getColor();
  }

  getRandomStyle() {
    const randomIndex =
      Math.floor(Math.random() * (this.styles.length - 1)) + 1;
    const style = this.styles[randomIndex];

    const fonts = ['font-one', 'font-two', 'font-three'];
    const font = fonts[Math.floor(Math.random() * 3)];

    return { color: style.color, 'background-color': style.bg, font: font };
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
    this.updateStyles();
  }

  changeStatus(key: number) {
    this.todos[key].status = !this.todos[key].status;
    this.localStorageService.setItem('todos', this.todos);
    this.stylesMap = {};
    this.updateStyles();
  }

  checkAll() {
    let prevStatus = this.todos[0].status;

    for (let todo of this.todos) {
      todo.status = !prevStatus;
    }
    prevStatus = !prevStatus;
    this.localStorageService.setItem('todos', this.todos);
    console.log(prevStatus);
    this.stylesMap = {};
    this.updateStyles();
  }

  getColor() {
    this.stylesMap =
      this.localStorageService.getItem<{
        [key: number]: {
          color: string;
          'background-color': string;
          font: string;
        };
      }>('todoStyles') || {};
  }
}
