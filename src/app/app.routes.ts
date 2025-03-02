import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

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
