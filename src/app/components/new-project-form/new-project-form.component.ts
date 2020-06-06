import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import { LoadingStartAction, LoadingFinishAction } from 'src/app/reducers/loading/loading.actions';

interface IRequirement {
  title: string;
  priority: boolean;
}

interface IProject {
  title: string;
  deadline: number;
  requirements: IRequirement[];
  description: string;
}

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.scss'],
})
export class NewProjectFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private userService: UserService,
    private router: Router,
    private store$: Store<LoadingState>
  ) {}

  newProjectForm: FormGroup;
  newProject: IProject;
  minDate = new Date();
  formatedProjectTitle: string;
  id: string;

  ngOnInit(): void {
    this.newProjectForm = this.fb.group({
      title: '',
      deadline: '',
      description: '',
      requirements: this.fb.array([]),
    });

    this.newProjectForm.valueChanges.subscribe((formData) => {
      this.newProject = {
        ...formData,
        deadline: Date.parse(formData.deadline),
      };
    });
  }

  get requirementsForms() {
    return this.newProjectForm.get('requirements') as FormArray;
  }

  addRequirement() {
    const requirement = this.fb.group({
      title: '',
      priority: false,
    });

    this.requirementsForms.push(requirement);
  }

  deleteRequirement(index: number) {
    this.requirementsForms.removeAt(index);
  }

  createProject() {
    this.store$.dispatch(new LoadingStartAction());

    this.projectService.createNewProject(this.newProject).subscribe({
      next: (response) => {
        const { _id, title } = response;
        this.id = _id;
        this.formatedProjectTitle = this.formatProjectTitleForUrl(title);

        this.userService.addUsersProject(response).subscribe();
      },
      error: (msg) => {
        console.log(msg);
      },
      complete: () => {
        this.store$.dispatch(new LoadingFinishAction());
        this.router.navigate([
          `project/${this.formatedProjectTitle}/${this.id}`,
        ]);
      },
    });
  }

  formatProjectTitleForUrl(projectTitle: string): string {
    return projectTitle.toLowerCase().split(' ').join('-');
  }
}
