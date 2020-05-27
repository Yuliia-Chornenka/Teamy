import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectService } from 'src/app/Services/project.service';
import { Subscription } from 'rxjs';
import { IProject } from '../../Models/project';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  project: IProject;
  id: string;
  title = '';
  description = '';
  deadline: number;
  members = [];
  requirements = [];
  projectUrl: string;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute) {
  }




  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params.id);
    this.getProject(this.id);
    this.projectUrl = window.location.href

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getProject(projectId): void {
    this.subscriptions.add(this.projectService.getProject(projectId).subscribe((project: IProject) => {

      this.project = project;
      this.title = project.title;
      this.description = project.description;
      this.deadline = project.deadline;
      this.requirements = project.requirements;
      this.members = project.members;
    }));
  }

  becomeMember(): void {
    this.subscriptions.add(this.projectService.becomeProjectMember(this.id).subscribe((project) => {
      this.members = project.members;
    }));
  }


}
