# TaskFlow

TaskFlow is a simple task management application built with Angular. You can add and delete tasks, mark them as completed, filter them, and search by title. The application also displays task counts and a task details view.

Tasks are stored in memory, so refreshing the page restores the initial list. The project does not use a backend.

## Technologies

- Angular 22 and TypeScript
- Angular Signals, Reactive Forms, and Router
- Vitest for unit testing

## Getting started

You need Node.js and npm. This project has been run with Node.js 24 and npm 11.

```bash
npm install
npm start
```

Open [http://localhost:4200/](http://localhost:4200/). The development server automatically reloads the application when files change.

## Tests and build

```bash
npm test                  # Run tests in watch mode
npm test -- --watch=false # Run tests once
npm run build             # Create a production build in dist/
```

## Structure

`TaskService` stores tasks and provides counts. `TaskList` handles the list, form, and filtering; `TaskCard` displays an individual task; and `TaskDetails` displays details based on the ID in the URL.
