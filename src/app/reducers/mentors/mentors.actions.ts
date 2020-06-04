import { Action } from '@ngrx/store';
import { IUser } from 'src/app/components/project/add-mentor-form/add-mentor-form.component';

export enum mentorsActionsType {
  add = '[MENTORS] add',
  remove = '[MENTORS] remove',
}

export class AddMentorAction implements Action {
  readonly type = mentorsActionsType.add;

  constructor(public payload: IUser) {}
}

export class RemoveMentorAction implements Action {
  readonly type = mentorsActionsType.remove;

  constructor(public payload: { id: string }) {}
}

export type MentorsActions = AddMentorAction | RemoveMentorAction;
