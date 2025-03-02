import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbAlertModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  constructor(private localStorageService: LocalStorageService) {}
  newTask: string = '';
  showValidationErrors = false;
  isSubmitted = false;
  timeoutId: any;

  onSubmit(todoForm: NgForm) {
    if (todoForm.invalid) {
      this.showValidationErrors = true;
      return;
    }
    
    this.isSubmitted = false;
  
    setTimeout(() => {
      this.isSubmitted = true;
  
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
  
      this.timeoutId = setTimeout(() => {
        this.isSubmitted = false;
        this.timeoutId = null;
      }, 5000);
    });
  
    this.localStorageService.addItem({ desc: this.newTask, status: false });
  
    todoForm.resetForm();
    this.showValidationErrors = false;
  }
  
}
