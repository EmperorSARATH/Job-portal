// jobsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { JobDTO } from '../dashboard/JobsList'; // adjust path
import { apiClient } from '@/lib/apiClient';

export interface JobsState {
  list: JobDTO[];
  loading: boolean;
}

const initialState: JobsState = {
  list: [],
  loading: false,
};

// Async thunk for fetching jobs
export const fetchJobSearch = createAsyncThunk(
  'jobs/fetchJobs',
  async (filter: string | null) => {
    let url = 'http://localhost:8080/list/jobs';
    if (filter) {
      url += `?filter=${encodeURIComponent(filter)}`;
    }
    const response = await apiClient(url);
    const data = await response.json();
    return data.content as JobDTO[]; // return only the content array
  }
);

const jobSearch = createSlice({
  name: 'jobSearch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchJobSearch.pending, state => { state.loading = true; })
      .addCase(fetchJobSearch.fulfilled, (state, action: PayloadAction<JobDTO[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchJobSearch.rejected, state => { state.loading = false; });
  }
});

export default jobSearch.reducer;

