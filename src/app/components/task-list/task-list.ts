import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task';
import { TaskForm } from '../task-form/task-form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Required for ngModel

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskForm, FormsModule], // ✅ FormsModule for ngModel
  templateUrl: './task-list.html'
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  allTasks: Task[] = []; // backup for filtering
  selectedTask?: Task;
  filterStatus: 'All' | 'Pending' | 'In Progress' | 'Completed' = 'All';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  // Load all tasks
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.allTasks = [...res];
      },
      error: (err) => console.error('Load Tasks Error:', err)
    });
  }

  // Open form to edit task
  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

  // Delete task
  deleteTask(taskId: number) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        alert('🗑️ Task deleted successfully!');
        this.loadTasks();
      },
      error: (err) => console.error('Delete Task Error:', err)
    });
  }

  // Add new task
  addNewTask() {
    this.selectedTask = {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      status: 'Pending'
    };
  }

  // Handle form submission
  onFormSubmit() {
    this.selectedTask = undefined;
    this.loadTasks();
  }

  // Sort tasks
  sortTasks(by: 'dueDate' | 'priority' | 'status') {
    this.tasks.sort((a, b) => {
      if (by === 'dueDate') {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
        return dateA - dateB;
      }
      if (by === 'priority') {
        return (a.priority || '').localeCompare(b.priority || '');
      }
      return (a.status || '').localeCompare(b.status || '');
    });
  }

  // Filter tasks
  filterTasks(status: 'All' | 'Pending' | 'In Progress' | 'Completed') {
    this.filterStatus = status;
    this.tasks = status === 'All'
      ? [...this.allTasks]
      : this.allTasks.filter(t => t.status === status);
  }
}
