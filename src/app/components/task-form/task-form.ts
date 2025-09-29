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

  minDate!: string; // For disabling past dates in date picker

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Set min date to today
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      const formattedDate = this.task.DueDate
        ? new Date(this.task.DueDate).toISOString().split('T')[0]
        : this.minDate;
      this.taskForm?.reset({
        Title: this.task.Title || 'New Task',
        Description: this.task.Description || 'Description here',
        DueDate: formattedDate,
        Priority: this.task.Priority || 'Low',
        Status: this.task.Status || 'Pending'
      });
    }
  }

  private buildForm() {
    const formattedDate = this.task?.DueDate
      ? new Date(this.task.DueDate).toISOString().split('T')[0]
      : this.minDate;

    this.taskForm = this.fb.group({
      Title: [this.task?.Title || 'New Task', Validators.required],
      Description: [this.task?.Description || 'Description here', Validators.required],
      DueDate: [formattedDate, [Validators.required, this.futureDateValidator]],
      Priority: [this.task?.Priority || 'Low', Validators.required],
      Status: [this.task?.Status || 'Pending', Validators.required]
    });
  }

  // Custom validator: Future Date Only
  futureDateValidator(control: any) {
    if (!control.value) return null;
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for comparison
    return selectedDate >= today ? null : { pastDate: true };
  }

  submit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.value;

    const payload: Task = {
      Title: formValue.Title,
      Description: formValue.Description || '',
      DueDate: formValue.DueDate ? new Date(formValue.DueDate).toISOString().split('T')[0] : this.minDate,
      Priority: formValue.Priority || 'Low',
      Status: formValue.Status || 'Pending'
    };

    if (this.task?.TaskId) {
      this.taskService.updateTask(this.task.TaskId, payload).subscribe({
        next: () => {
          alert('Task updated successfully!');
          this.ngSubmit.emit();
        },
        error: (err) => console.error('Update Task Error:', err)
      });
    } else {
      this.taskService.addTask(payload).subscribe({
        next: () => {
          alert('Task added successfully!');
          this.ngSubmit.emit();
        },
        error: (err) => console.error('Add Task Error:', err)
      });
    }
  }
}
