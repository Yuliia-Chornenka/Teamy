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
  teams?: [object];
  mentors?: Array<string>;
  role?: string;
  _id?: string;
  status?: string;
}
