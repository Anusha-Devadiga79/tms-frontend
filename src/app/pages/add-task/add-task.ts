import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule
  ],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css']
})
export class AddTask {
  taskForm: FormGroup;
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Pending', 'In Progress', 'Completed'];

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  submit() {
    if (this.taskForm.invalid) return;

    const taskData: Task = {
      ...this.taskForm.value,
      userId: Number(localStorage.getItem('userId'))
    };

    this.taskService.addTask(taskData).subscribe({
      next: () => {
        alert('Task added successfully');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => alert(err?.error?.message || 'Failed to add task')
    });
  }
}
