import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todos: { desc: string; status: boolean }[] = [];
  testTodos1: string[] = [
    'Learn Angular',
    'Build a project',
    'Get a job offer',
  ];

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

  testTodos = [
    { desc: 'Learn Angular', status: false },
    { desc: 'Build a project', status: false },
    { desc: 'Get a job offer', status: false },
  ];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.loadTodos();
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

      console.log(savedStyles[index]);
    });

    this.localStorageService.setItem('todoStyles', savedStyles);
    this.stylesMap = savedStyles;
  }

  addTestData() {
    this.testTodos.forEach((todo) => {
      this.localStorageService.addItem(todo);
    });

    this.loadTodos();
  }

  clearTestData() {
    this.todos = [];
    this.localStorageService.clear();
  }

  getRandomStyle() {
    const randomIndex =
      Math.floor(Math.random() * (this.styles.length - 1)) + 1;
    const style = this.styles[randomIndex];
    return { color: style.color, 'background-color': style.bg };
  }
}
