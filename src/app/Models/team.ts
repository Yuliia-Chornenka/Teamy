export interface ITeam {
  project_id: string;
  project_name: string;
  members: [
    {
      _id: string;
      user_id: string;
      user_name: string;
      user_photo?: string;
    }
  ];
  history: [
    {
      _id: string;
      user_id: string;
      date: number;
      text: string;
    }
  ];
  files?: Array<string>;
  images?: Array<string>;
}
