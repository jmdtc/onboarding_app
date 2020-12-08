import { configureStore } from "@reduxjs/toolkit";
import onboardingReducer from "../slices/onboardingSlice"

export default configureStore({
  reducer: {
    onboarding: onboardingReducer
  }
})
