import { Action } from '@ngrx/store';
import { UserInterface } from 'src/app/components/project/add-mentor-form/add-mentor-form.component';

export enum mentorsActionsType {
  save = '[MENTORS] save',
  add = '[MENTORS] add',
  remove = '[MENTORS] remove',
}

export class SaveMentorsAction implements Action {
  readonly type = mentorsActionsType.save;

  constructor(public payload: UserInterface[]) {}
}

export class AddMentorAction implements Action {
  readonly type = mentorsActionsType.add;

  constructor(public payload: UserInterface) {}
}

export class RemoveMentorAction implements Action {
  readonly type = mentorsActionsType.remove;

  constructor(public payload: { id: string }) {}
}

export type MentorsActions =
  | AddMentorAction
  | RemoveMentorAction
  | SaveMentorsAction;
