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
  id: string;
  title = '';
  description = '';
  deadline: Date;
  members = [];
  requirements = [];

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id = params.id);
    this.getProjectData(this.id);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getProjectData(projectId): void {
    this.subscriptions.add(this.projectService.getProjectData(projectId).subscribe( (project: IProject) => {

      console.log(project);
      console.log(project.title);
      console.log(project.description);
      console.log(project.deadline);
      console.log(project.requirements);
      console.log(project.members);
    }));
  }

}
