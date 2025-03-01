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
}
