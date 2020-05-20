import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";




interface IRequirement {
  title: string,
  priority: boolean
}

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.css']
})



export class NewProjectFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  newProjectForm: FormGroup;




  // title: string;
  // deadline: string;
  // requirements: IRequirement[] = [{
  //   title: "",
  //   priority: false
  // }, {
  //   title: "",
  //   priority: false
  // }, {
  //   title: "",
  //   priority: false
  // }];


  ngOnInit(): void {
    this.newProjectForm = this.fb.group({
      title: "",
      deadline: "",
      requirements: this.fb.array([])
    })


    this.newProjectForm.valueChanges.subscribe(console.log)

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

  deleteRequirement(index) {
    this.requirementsForms.removeAt(index)
  }



}
