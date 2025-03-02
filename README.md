# Todo App

A simple Todo application built with Angular and Bootstrap.

## Preview
![image](https://github.com/user-attachments/assets/6a524335-ecaf-4849-b8b4-9bba1202255f)
![image](https://github.com/user-attachments/assets/d24c2747-6bd5-4ae0-a9eb-6041757a0bdf)

## Features

- Add, edit, and delete tasks
- Mark tasks as completed
- Store tasks using LocalStorage
- Navigation between pages with active link indication
- Only incomplete tasks can be deleted
- Completed tasks have a distinct appearance

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the application:
   ```sh
   ng serve
   ```

4. Open the browser and navigate to `http://localhost:4200/`

## Built With

- **Angular** - Frontend framework
- **Bootstrap** - UI styling
- **FontAwesome** - Icons

## Folder Structure

```
/src
  /app
    /components
      - add-todo.component.ts
      - edit-todo.component.ts
      - home.component.ts
    /services
      - local-storage.service.ts
    - app.component.ts
    - app.config.ts
    - app.routes.ts
  - index.html
  - styles.css
```
