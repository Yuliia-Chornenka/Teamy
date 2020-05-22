import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ProjectService } from 'src/app/Services/project.service';
import { Router } from '@angular/router';

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

interface IResponse {
  id: string;
}

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.scss']
})



export class NewProjectFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) { }

  newProjectForm: FormGroup;
  newProject: IProject;
  minDate = new Date();
  projectId: string;



  ngOnInit(): void {
    this.newProjectForm = this.fb.group({
      title: '',
      deadline: '',
      description: '',
      requirements: this.fb.array([])
    });


    this.newProjectForm.valueChanges.subscribe(formData => {
      this.newProject = { ...formData, deadline: Date.parse(formData.deadline) };
    });

  }

  get requirementsForms() {
    return this.newProjectForm.get('requirements') as FormArray;
  }

  addRequirement() {

    const requirement = this.fb.group({
      title: '',
      priority: false
    });

    this.requirementsForms.push(requirement);

  }

  deleteRequirement(index: number) {
    this.requirementsForms.removeAt(index);
  }

  createProject() {
    this.projectService.createNewProject(this.newProject).subscribe({
      next: (response) => {

        const { id } = response;

        this.projectId = id;
      },
      error: (msg) => {

        console.log(msg);

      }, complete: () => {
        this.router.navigate([`project/${this.projectId}`]);
      }
    });
  }



}
