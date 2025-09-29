import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TaskForm } from '../../components/task-form/task-form';
import { Task, TaskService } from '../../services/task';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    TaskForm,
    FormsModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  tasks: Task[] = [];
  allTasks: Task[] = []; // backup for filtering
  showForm = false;
  editTaskData?: Task;
  filterStatus: 'All' | 'Pending' | 'In Progress' | 'Completed' = 'All';

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.allTasks = [...res]; // backup for filtering
      },
      error: (err) => console.error(err)
    });
  }

  toggleAddForm() {
    this.editTaskData = undefined;
    this.showForm = !this.showForm;
  }

  editTask(task: Task) {
    this.editTaskData = { ...task };
    this.showForm = true;
  }

  deleteTask(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error(err)
      });
    }
  }

  onFormSubmit() {
    this.showForm = false;
    this.editTaskData = undefined;
    this.loadTasks();
  }

  // Filter tasks by status
  filterTasks(status: 'All' | 'Pending' | 'In Progress' | 'Completed') {
    this.filterStatus = status;
    this.tasks = status === 'All' ? [...this.allTasks] : this.allTasks.filter(t => t.status === status);
  }
}
