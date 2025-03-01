import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  todos: string[] = [];
  testTodos: string[] = ['Learn Angular', 'Build a project', 'Get a job offer'];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    const savedTodos = this.localStorageService.getItem<string[]>('todos');
    if (savedTodos) {
      this.todos = savedTodos;
    }
  }

  addTestData() {
    this.todos = [...this.todos, ...this.testTodos];
    this.localStorageService.setItem('todos', this.todos);
  }
}
