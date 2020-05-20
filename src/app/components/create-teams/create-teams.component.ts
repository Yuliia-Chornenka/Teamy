import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-teams',
  templateUrl: './create-teams.component.html',
  styleUrls: ['./create-teams.component.css']
})
export class CreateTeamsComponent implements OnInit {

  students = ['Юля', 'Саша', 'Таня', 'Настя', 'Ігор', 'Вова', 'Ваня', 'Діма', 'Андрій', 'Катя', 'Oleh', 'Vlad', 'Nina'];
  teams = [];

  constructor() { }

  ngOnInit(): void {
    this.createRandomTeams(this.students, 4);
  }

  createRandomTeams(arrayOfStudents, numberOfTeams): void {
    const numberOfParticipants = Math.floor(arrayOfStudents.length / numberOfTeams);

    for (let i = arrayOfStudents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayOfStudents[i], arrayOfStudents[j]] = [arrayOfStudents[j], arrayOfStudents[i]];
    }

    for (let i = 1; i <= numberOfTeams; i++) {
      const team = arrayOfStudents.splice(0, numberOfParticipants);
      this.teams.push(team);
    }

    if (arrayOfStudents.length) {
        arrayOfStudents.forEach((student, index) => {
          this.teams[index].push(student);
        });
    }
  }

}
