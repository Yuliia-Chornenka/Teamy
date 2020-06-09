import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  AbstractControlDirective,
} from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Store } from '@ngrx/store';
import { LoadingState } from 'src/app/reducers/loading/loading.reducer';
import {
  LoadingStartAction,
  LoadingFinishAction,
} from 'src/app/reducers/loading/loading.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private store$: Store<LoadingState>,
    private snackBar: MatSnackBar
  ) {}

  newProjectForm: FormGroup;
  newProject: IProject;
  minDate = new Date();
  formatedProjectTitle: string;
  id: string;

  ngOnInit(): void {
    this.newProjectForm = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      deadline: new FormControl('', Validators.required),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      requirements: this.fb.array([]),
    });

    this.newProjectForm.valueChanges.subscribe((formData) => {
      this.newProject = {
        ...formData,
        deadline: Date.parse(formData.deadline) + 86399000,
      };
    });
  }

  get requirementsForms() {
    return this.newProjectForm.get('requirements') as FormArray;
  }

  get titleControl(): AbstractControl {
    return this.newProjectForm.get('title');
  }

  get descriptionControl(): AbstractControl {
    return this.newProjectForm.get('description');
  }

  get requirementConstrol(): AbstractControl {
    return this.newProjectForm.get('requirements');
  }

  get deadlineControll(): AbstractControl {
    return this.newProjectForm.get('deadline');
  }

  getErrorTitle(): string {
    if (this.titleControl.hasError('required')) {
      return 'You must enter a title';
    }

    if (this.titleControl.hasError('minlength')) {
      return 'Title must be at least 2 characters';
    }
  }

  getErrorDescription(): string {
    if (this.descriptionControl.hasError('required')) {
      return 'You must enter a description';
    }

    if (this.descriptionControl.hasError('minlength')) {
      return 'Description must be at least 2 characters';
    }
  }

  getErrorRequirement(): string {
    if (this.descriptionControl.hasError('required')) {
      return 'You must enter a requirement';
    }
  }

  getErrorDeadline(): string {
    if (this.deadlineControll.hasError('required')) {
      return 'You must enter a deadline';
    }
  }

  addRequirement() {
    const requirement = this.fb.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
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
      error: (err) => {
        this.openSnackBar(err.error.message, 'ERROR');
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

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
