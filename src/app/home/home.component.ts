import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todos: { desc: string; status: boolean }[] = [];

  stylesMap: { [key: number]: { color: string; 'background-color': string } } =
    {};

  testTodos = [
    { desc: 'Learn Angular', status: false },
    { desc: 'Build a project', status: false },
    { desc: 'Get a job offer', status: false },
  ];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.localStorageService.getAllItems().map((todo) => todo);
    this.getColor();
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

  goToEditPage() {
    this.router.navigate(['/edit']);
  }

  getColor() {
    this.stylesMap =
      this.localStorageService.getItem<{
        [key: number]: { color: string; 'background-color': string };
      }>('todoStyles') || {};
  }
}
