import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { UiService } from '../../services/ui.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter();
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;
  faEdit = faEdit;
  showEditTask:boolean;

  constructor() {}

  ngOnInit(): void {}

  onDelete(task: Task): void {
    if (confirm("Are you sure?"))
    {
      this.onDeleteTask.emit(task);
    }
  }

  onToggle(task: Task): void {
    this.onToggleReminder.emit(task);
  }

  onEdit(task: Task): void {
    this.showEditTask = !this.showEditTask;
  }

  onSubmit(task: Task): void {
    console.log("TaskItemComponent::onSubmit(" + task + ")");
    this.showEditTask = false;
    this.onEditTask.emit(task);
  }
}
