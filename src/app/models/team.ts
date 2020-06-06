export interface ITeam {
  _id: string;
  project_id: string;
  project_name: string;
  name?: string;
  members: [
    {
      _id: string;
      user_id: string;
      user_name: string;
      user_photo?: string;
    }
  ];
  mentors: [
    {
      _id: string;
      user_id: string;
      user_name: string;
      user_photo?: string;
      user_email: string;
      mark?: string;
      comment?: string;
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
