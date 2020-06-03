export interface ITeam {
  project_id: string;
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
}
