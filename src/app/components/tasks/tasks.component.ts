import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';
import { Observer } from 'rxjs';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private appComponent: AppComponent) {}

  ngOnInit(): void {

    var accessToken = this.appComponent.getAccessToken();
    if (accessToken === '')
    {
      this.appComponent.login().subscribe(
        {
          next: (x: any) => {
            this.taskService.setAccessToken(x.accessToken);
            this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
          }
        });

    }
    else
    {
      this.taskService.setAccessToken(accessToken);
      this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
    }
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  editTask(task: Task): void {
    console.log("TasksComponent::editTask " + task);

    const myObserver:Observer<Task> = {
      next: (x: Task) => console.log('Observer got a next value: ' + x),
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };

    this.taskService.updateTask(task).subscribe(myObserver);
  }
}
