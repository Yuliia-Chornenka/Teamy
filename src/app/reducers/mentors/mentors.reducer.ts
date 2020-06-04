import { MentorsActions, mentorsActionsType } from './mentors.actions';
import { IUser } from 'src/app/components/project/add-mentor-form/add-mentor-form.component';

export const mentorsNode = 'mentors';

export interface MentorsState {
  mentors: IUser[];
}

const initialState = { mentors: [] };

export const mentorsReducer = (
  state: MentorsState = initialState,
  action: MentorsActions
) => {
  switch (action.type) {
    case mentorsActionsType.save:
      return { ...state, mentors: [...state.mentors, ...action.payload] };
    case mentorsActionsType.add:
      return { ...state, mentors: [...state.mentors, action.payload] };
    case mentorsActionsType.remove:
      return {
        ...state,
        mentors: state.mentors.filter(
          (mentor) => mentor._id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};
