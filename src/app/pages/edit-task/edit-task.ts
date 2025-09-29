import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-task.html'
})
export class EditTask implements OnInit {
  taskForm: FormGroup;
  priorities = ['Low', 'Medium', 'High'];
  statuses = ['Pending', 'In Progress', 'Completed'];
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['Medium', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  ngOnInit() {
    this.taskId = +this.route.snapshot.params['id'];
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        const task = tasks.find(t => t.TaskId === this.taskId);
        if (task) this.taskForm.patchValue(task);
      },
      error: (err) => console.error(err)
    });
  }

  submit() {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        taskId: this.taskId,
        ...this.taskForm.value
      };

      this.taskService.updateTask(this.taskId, updatedTask).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => alert('Failed to update task')
      });
    }
  }
}
