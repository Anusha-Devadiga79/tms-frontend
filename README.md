Absolutely! I’ve updated both README files based on your changes: your `.env`, backend run command (`node server.js`), frontend run command (`ng serve`), and the schema with sample data. These are now ready-to-use for your GitHub repos.

---

## **Frontend README (`tms-frontend`)**

```markdown
# Task Management System - Frontend

This is the **Angular frontend** for the Task Management System (TMS).  
It allows users to register, login, view tasks, add/edit/delete tasks, and filter them by status.

## Features

- User Authentication (Login & Register)
- Dashboard to view tasks in a table format
- Add, Edit, Delete tasks
- Filter tasks by status: All, Pending, In Progress, Completed
- Responsive UI (desktop + mobile friendly)
- Form validations:
  - Required fields
  - Valid email for registration
  - Due date must be in the future
- Built with Angular, Angular Material, and Reactive Forms

## Project Structure

```

src/
├── app/
│   ├── pages/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── add-task/
│   │   └── edit-task/
│   ├── components/
│   │   └── task-form/
│   └── services/
│       └── task.ts
└── assets/

````

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Anusha-Devadiga79/tms-frontend.git
cd tms-frontend
````

2. Install dependencies:

```bash
npm install
```

3. Run the Angular development server:

```bash
ng serve
```

4. Open your browser at `http://localhost:4200`.

## Notes

* Make sure the **backend API** is running before using the frontend.
* API URLs can be configured in `task.service.ts`.

## Links

* Backend Repository: [tms-backend](https://github.com/Anusha-Devadiga79/tms-backend)

````
