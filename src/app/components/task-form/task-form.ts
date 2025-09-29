import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html'
})
export class TaskForm implements OnInit, OnChanges {
  @Input() task?: Task;
  @Output() ngSubmit = new EventEmitter<void>();
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      const formattedDate = this.task.dueDate ? new Date(this.task.dueDate).toISOString().split('T')[0] : '';
      this.taskForm?.reset({
        title: this.task.title,
        description: this.task.description,
        dueDate: formattedDate,
        priority: this.task.priority || 'Low',
        status: this.task.status || 'Pending'
      });
    }
  }

  private buildForm() {
    const formattedDate = this.task?.dueDate ? new Date(this.task.dueDate).toISOString().split('T')[0] : '';
    
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || '', Validators.required],
      dueDate: [formattedDate, Validators.required],
      priority: [this.task?.priority || 'Low', Validators.required],
      status: [this.task?.status || 'Pending', Validators.required]
    });
  }

  submit() {
    if (this.taskForm.invalid) return;

    const taskData: Task = this.taskForm.value;

    if (this.task?.TaskId) {
      // UPDATE existing task
      this.taskService.updateTask(this.task.TaskId, taskData).subscribe({
        next: () => {
          alert('Task updated successfully!');
          this.ngSubmit.emit();
        },
        error: (err) => console.error('Update Task Error:', err)
      });
    } else {
      // ADD new task
      this.taskService.addTask(taskData).subscribe({
        next: () => {
          alert('Task added successfully!');
          this.ngSubmit.emit();
        },
        error: (err) => console.error('Add Task Error:', err)
      });
    }
  }
}
