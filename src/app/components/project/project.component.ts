import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  students = ['Юля', 'Саша', 'Таня', 'Настя', 'Ігор', 'Вова', 'Ваня', 'Діма', 'Андрій', 'Катя', 'Oleh', 'Vlad', 'Nina'];
  project;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getProject(this.projectService.projectId).subscribe(data => {
      this.project = data;
    })
  }

}
