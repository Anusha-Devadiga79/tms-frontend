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
  allTasks: Task[] = []; 
  showForm = false;
  editTaskData?: Task;

  filterStatus: 'All' | 'Pending' | 'In Progress' | 'Completed' = 'All';
  filterPriority: 'All' | 'Low' | 'Medium' | 'High' = 'All';
  filterDue: 'All' | 'Today' | 'This Week' = 'All';

  constructor(private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.allTasks = [...res]; 
        this.applyFilters();
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

  filterTasks(status?: any, priority?: any, due?: any) {
    if (status) this.filterStatus = status;
    if (priority) this.filterPriority = priority;
    if (due) this.filterDue = due;
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.allTasks];

    // Filter by Status
    if (this.filterStatus !== 'All') {
      filtered = filtered.filter(t => t.Status === this.filterStatus);
    }

    // Filter by Priority
    if (this.filterPriority !== 'All') {
      filtered = filtered.filter(t => t.Priority === this.filterPriority);
    }

    // Filter by Due Date
    const today = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date();
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    if (this.filterDue === 'Today') {
      filtered = filtered.filter(t => t.DueDate && new Date(t.DueDate).toDateString() === today.toDateString());
    } else if (this.filterDue === 'This Week') {
      filtered = filtered.filter(t => {
        if (!t.DueDate) return false;
        const d = new Date(t.DueDate);
        return d >= startOfWeek && d <= endOfWeek;
      });
    }

    this.tasks = filtered;
  }
}
