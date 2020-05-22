interface IRequirement {
    title: string,
    priority: boolean
}

export interface IProject {
    title: string,
    deadline: number,
    requirements: IRequirement[],
    description: string
}