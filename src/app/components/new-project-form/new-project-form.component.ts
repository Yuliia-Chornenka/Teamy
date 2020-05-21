import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

interface IRequirement {
  title: string,
  priority: boolean
}

interface Project {
  title: string,
  deadline: number,
  requirements: IRequirement[]
}

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.scss']
})



export class NewProjectFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  newProjectForm: FormGroup;
  newProject: Project[];



  ngOnInit(): void {
    this.newProjectForm = this.fb.group({
      title: "",
      deadline: "",
      requirements: this.fb.array([])
    })


    this.newProjectForm.valueChanges.subscribe(formData => {
      this.newProject = {...formData, deadline: Date.parse(formData.deadline)};
    })

  }

  get requirementsForms() {
    return this.newProjectForm.get('requirements') as FormArray
  }

  addRequirement() {

    const requirement = this.fb.group({
      title: "",
      priority: false
    })

    this.requirementsForms.push(requirement)

  }

  deleteRequirement(index: number) {
    this.requirementsForms.removeAt(index)
  }



}
