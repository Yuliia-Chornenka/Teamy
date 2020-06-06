import { MentorsActions, mentorsActionsType } from './mentors.actions';
import { UserInterface } from 'src/app/components/project/add-mentor-form/add-mentor-form.component';

export const mentorsNode = 'mentors';

export interface MentorsState {
  mentors: UserInterface[];
}

const initialState = {
  mentors: [
    // {
    //   _id: '5ecbbf5ce3dd0c00175a2333',
    //   name: 'Yulia',
    //   photo:
    //     'https://teamy.s3.amazonaws.com/1590950911791iconfinder_Man-16_379442.png',
    //   email: '123@123',
    // },
    // {
    //   _id: '5ed54665bb0846001728840d',
    //   name: 'Ivan',
    //   photo: 'https://teamy.s3.amazonaws.com/15911189851838069da92-96a5-4ad6-bb93-6b302a7dbbb4.jpg',
    //   email: 'blackyulia583@gmail.com',
    // },
  ],
};

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
