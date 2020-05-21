import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-teams',
  templateUrl: './create-teams.component.html',
  styleUrls: ['./create-teams.component.scss']
})
export class CreateTeamsComponent implements OnInit {


  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];


  students = ['Юля Чорненька', 'Саша', 'Таня', 'Настя', 'Ігор', 'Вова', 'Ваня', 'Діма', 'Андрій', 'Катя', 'Oleh', 'Vlad', 'Nina'];
  randomTeams = [];
  ownTeams = [];
  ownTeamsQuantity = [];
  isTeamExist = false;
  isRandomTeam = false;
  isOwnTeam = false;

  formCreateTeams: FormGroup;
  successCreation = true;


  constructor() { }

  ngOnInit(): void {
    this.formCreateTeams = new FormGroup({
      quantity: new FormControl('', [ Validators.required, Validators.min(2) ]),
    });
  }

  get quantityControl(): AbstractControl {
    return this.formCreateTeams.get('quantity');
  }

  getErrorQuantity(): string {
    if (this.quantityControl.hasError('required')) {
      return 'You must enter a number';
    }
    return this.quantityControl.hasError('min') ? 'At least 2 randomTeams' : '';
  }

  createRandomTeams(arrayOfStudents, numberOfTeams): void {
    this.isTeamExist = true;
    this.isRandomTeam = true;
    const numberOfParticipants = Math.floor(arrayOfStudents.length / numberOfTeams);

    for (let i = arrayOfStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayOfStudents[i], arrayOfStudents[j]] = [arrayOfStudents[j], arrayOfStudents[i]];
    }

    for (let i = 1; i <= numberOfTeams; i++) {
      const team = arrayOfStudents.splice(0, numberOfParticipants);
      this.randomTeams.push(team);
    }

    if (arrayOfStudents.length) {
        arrayOfStudents.forEach((student, index) => {
          this.randomTeams[index].push(student);
        });
    }
  }

  createTeamsByOwn(numberOfTeams): void {
    this.isOwnTeam = true;
    this.formCreateTeams.disable();

    for (let i = 1; i <= numberOfTeams; i++) {
      this.ownTeamsQuantity.push(i);
    }
  }





  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
