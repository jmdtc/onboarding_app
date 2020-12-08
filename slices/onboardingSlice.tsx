import { createSlice } from '@reduxjs/toolkit';

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    goals: {
      find_workouts: {
        name: 'find_workouts',
        title: 'Find workouts for my pregnancy',
        checked: false
      },
      maintain_weight: {
        name: 'maintain_weight',
        title: 'Not to gain unnecessary weight',
        checked: false
      },
      birth_preparation: {
        name: 'birth_preparation',
        title: 'Prepare for birth',
        checked: false
      },
      feel_relaxed: {
        name: 'feel_relaxed',
        title: 'Feel more relaxed',
        checked: false
      }
    },
    due_date: Date.now(),
    activity_level: 3
  },
  reducers: {
    toggleGoal: (state, action) => {
      const { name } = action.payload
      state.goals[name] = {
        ...state.goals[name],
        checked: !state.goals[name].checked
      }
    },
    setDueDate: (state, action) => {
      state.due_date = action.payload
    },
    setActivityLevel: (state, action) => {
      state.activity_level = action.payload
    }
  }
})

export const {
  toggleGoal,
  setDueDate,
  setActivityLevel
} = onboardingSlice.actions

export const selectGoals = state => state.onboarding.goals
export const selectDueDate = state => state.onboarding.due_date
export const selectActivityLevel = state => state.onboarding.activity_level
export const selectOnboarding = state => state.onboarding
export default onboardingSlice.reducer;
