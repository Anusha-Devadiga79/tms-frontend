import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  TaskId?: number;
  Title: string;
  Description?: string;
  DueDate: string | null;
  Priority?: 'Low' | 'Medium' | 'High';
  Status?: 'Pending' | 'In Progress' | 'Completed';
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // backend URL

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token'); 
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, this.getHeaders());
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  addTask(task: Task): Observable<Task> {
    // Prepare payload for backend
    const payload = {
      Title: task.Title,
      Description: task.Description || '',
      DueDate: task.DueDate
        ? new Date(task.DueDate).toISOString().split('T')[0]
        : '2025-10-10', // fallback default
      Priority: task.Priority || 'Low',
      Status: task.Status || 'Pending'
    };
    return this.http.post<Task>(this.apiUrl, payload, this.getHeaders());
  }

  updateTask(id: number, task: Task): Observable<Task> {
    // Prepare payload for backend
    const payload = {
      Title: task.Title,
      Description: task.Description || '',
      DueDate: task.DueDate
        ? new Date(task.DueDate).toISOString().split('T')[0]
        : '2025-10-10', // fallback default
      Priority: task.Priority || 'Low',
      Status: task.Status || 'Pending'
    };
    return this.http.put<Task>(`${this.apiUrl}/${id}`, payload, this.getHeaders());
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }
}
