// features/job/jobSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Skill {
  objectId: string;
  name: string;
}

export interface Job {
  objectId: string;
  title: string;
  description: string;
  location?: string;
  company?: string;
  city?: string;
  skills: Skill[];
  taskSize:string;
  userName:string;
}

interface JobState {
  selectedJob: Job | null;
}

const initialState: JobState = {
  selectedJob: null,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    setSelectedJob(state, action: PayloadAction<Job>) {
      state.selectedJob = action.payload;
    },
    clearSelectedJob(state) {
      state.selectedJob = null;
    },
  },
});

export const { setSelectedJob, clearSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;

