import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task';
import { TaskForm } from '../task-form/task-form';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskForm, FormsModule],
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
        alert('Task deleted successfully!');
        this.loadTasks();
      },
      error: (err) => console.error('Delete Task Error:', err)
    });
  }

  // Add new task
  addNewTask() {
    this.selectedTask = {
      Title: '',
      Description: '',
      DueDate: '',
      Priority: 'Low',
      Status: 'Pending'
    };
  }

  // Handle form submission
  onFormSubmit() {
    this.selectedTask = undefined;
    this.loadTasks();
  }

  // Sort tasks
  sortTasks(by: 'DueDate' | 'Priority' | 'Status') {
    this.tasks.sort((a, b) => {
      if (by === 'DueDate') {
        const dateA = a.DueDate ? new Date(a.DueDate).getTime() : 0;
        const dateB = b.DueDate ? new Date(b.DueDate).getTime() : 0;
        return dateA - dateB;
      }
      if (by === 'Priority') {
        return (a.Priority || '').localeCompare(b.Priority || '');
      }
      return (a.Status || '').localeCompare(b.Status || '');
    });
  }

  // Filter tasks
  filterTasks(status: 'All' | 'Pending' | 'In Progress' | 'Completed') {
    this.filterStatus = status;
    this.tasks = status === 'All'
      ? [...this.allTasks]
      : this.allTasks.filter(t => t.Status === status);
  }
}
