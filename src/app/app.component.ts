import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title:string = 'angular-crash'
  myAccessToken:string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.login().subscribe(
      {
        next: (x: any) => {
          this.myAccessToken = x.accessToken;
          this.taskService.setAccessToken(x.accessToken);
        }
      });
  }

  login() {
    return this.taskService.login();
  }

  getAccessToken(): string {
    return this.myAccessToken;
  }
}
