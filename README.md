---

# **Task Management System - Frontend**

This is the **Angular frontend** for the **Task Management System (TMS)**.
It provides a responsive UI for users to register, log in, manage tasks, and filter them by status.

---

## **Features**

* **User Authentication**: Registration & Login (JWT-based)
* **Dashboard**:

  * View tasks in a table format
  * Add, Edit, Delete tasks
  * Filter tasks by status: All, Pending, In Progress, Completed
* **Form Validations**:

  * Required fields
  * Valid email for registration
  * Due date must be in the future
* Responsive UI for desktop and mobile
* Built with Angular, Angular Material, and Reactive Forms

---

## **Project Structure**

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
|   |   └── task-list/
│   └── services/
│   |  └── task.ts
|   |  └── auth.ts
└── environments/
```

---

## **Setup Instructions**

1. **Clone the repository**:

```bash
git clone https://github.com/Anusha-Devadiga79/tms-frontend.git
cd tms-frontend
```

2. **Install dependencies**:

```bash
npm install
```

3. **Run the Angular development server**:

```bash
ng serve
```

4. **Open your browser**:

```
http://localhost:4200
```

---

## **Notes**

* Ensure the **backend API** is running before using the frontend.
* API URLs can be configured in `task.ts`.
* For production deployment, build the project with:

```bash
ng build --prod
```

---

## **Links**

* Backend Repository: [tms-backend](https://github.com/Anusha-Devadiga79/tms-backend)

---
