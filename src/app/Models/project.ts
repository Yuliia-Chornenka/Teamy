interface IRequirement {
    title: string;
    priority: boolean;
}

export interface IProject {
    title: string;
    deadline: number;
    requirements: IRequirement[];
    description: string;
    members?: Array<string>;
    teams?: [object];
    mentors?: Array<string>;
    role?: string;
    _id?: string;
    status?: string;
}
