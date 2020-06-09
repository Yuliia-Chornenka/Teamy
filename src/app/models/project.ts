import { UserInterface } from '../components/project/add-mentor-form/add-mentor-form.component';
import { IProjectTeam } from './projectTeam';

interface IRequirement {
  title: string;
  priority: boolean;
}

export interface IProject {
  created_by?: string;
  title: string;
  deadline: number;
  requirements: IRequirement[];
  description: string;
  members?: [object];
  teams?: Array<[IProjectTeam]>;
  mentors?: UserInterface[];
  role?: string;
  _id?: string;
  status?: string;
}
