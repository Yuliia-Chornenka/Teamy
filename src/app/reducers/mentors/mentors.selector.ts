import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mentorsNode, MentorsState } from './mentors.reducer';
import { UserInterface } from 'src/app/components/project/add-mentor-form/add-mentor-form.component';

const selectMentorsFeature = createFeatureSelector<MentorsState>(mentorsNode);

export const selectMentors = createSelector(
  selectMentorsFeature,
  (state): UserInterface[] => state.mentors
);
