import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddTodoComponent },
  { path: 'edit', component: EditTodoComponent },
  { path: 'edit/:id', component: EditTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
