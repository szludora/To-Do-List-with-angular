import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  constructor(private localStorageService: LocalStorageService) {}
  newTask: string = '';

  onSubmit() {
    if (!this.newTask.trim()) return;

    this.localStorageService.addItem(this.newTask);
    alert('Your todo successfully added!');
    this.newTask = '';
  }
}
