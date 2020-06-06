import { Component, Input, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { IProject } from '../../../models/project';


@Component({
  selector: 'app-user-projects-list',
  templateUrl: './user-projects-list.component.html',
  styleUrls: [ './user-projects-list.component.scss' ]
})
export class UserProjectsListComponent implements OnInit {

  searchValue = '';

  selectedRole = '';
  roles = [ 'mentor', 'member' ];

  selectedDeadline = '';
  deadlines: number[] = [];

  selectedStatus = '';
  statuses = [ 'Finished', 'In progress' ];

  today = new Date().toISOString();
  columns: string[] = [ 'Role', 'Title', 'Deadline', 'Status' ];
  isDataLoading = true;
  sortedData: IProject[] = [];

  @Input() projectsList: IProject[];

  constructor() {
  }

  ngOnInit(): void {
    this.getProjectsData();
  }

  getProjectsData() {
    this.isDataLoading = !this.projectsList.length;

    this.projectsList.forEach((project: IProject) => {
      project.status = this.isProjectFinished(this.today, project.deadline);

      if (!this.deadlines.includes(project.deadline)) {
        this.deadlines.push(project.deadline);
        this.deadlines.sort();
      }
    });
    this.sortedData = this.projectsList;
  }

  getDaysToDeadline(dayOne: string, dayTwo: number): number {
    const firstDate: any = new Date(dayOne);
    const secondDate: any = new Date(dayTwo);
    return (secondDate - firstDate) / (60 * 60 * 24 * 1000);
  }

  isProjectFinished(dayOne: string, dayTwo: number): string {
    const firstDate: any = new Date(dayOne);
    const secondDate: any = new Date(dayTwo);
    if (((secondDate - firstDate) / (60 * 60 * 24 * 1000)) < 0) {
      return 'Finished';
    } else {
      return 'In progress';
    }
  }

  sortData(sort: Sort): string {
    const data = this.projectsList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a: IProject, b: IProject) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Role':
          return compare(a.role.toLowerCase(), b.role.toLowerCase(), isAsc);
        case 'Title':
          return compare(a.title.toLowerCase(), b.title.toLowerCase(), isAsc);
        case 'Deadline':
          return compare(a.deadline, b.deadline, isAsc);
        case 'Status':
          return compare(a.deadline, b.deadline, isAsc);
        default:
          return 0;
      }
    });
  }


  resetSearchInput(): void {
    this.searchValue = '';
  }

  resetSelectedRole(): void {
    this.selectedRole = '';
  }

  resetSelectedDeadline(): void {
    this.selectedDeadline = '';
  }

  resetSelectedStatus(): void {
    this.selectedStatus = '';
  }

  resetAllFilters(): void {
    this.searchValue = '';
    this.selectedRole = '';
    this.selectedDeadline = '';
    this.selectedStatus = '';
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
