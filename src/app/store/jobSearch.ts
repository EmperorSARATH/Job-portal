// jobsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { JobDTO } from '../dashboard/JobsList'; // adjust path
import { apiClient } from '@/lib/apiClient';
import { config } from '@/lib/config';

export interface JobsState {
    list: JobDTO[];
    loading: boolean;
}

const initialState: JobsState = {
    list: [],
    loading: false,
    page: 0,
    hasNext: true,
    error: null,
};

// Async thunk for fetching jobs
// export const fetchJobSearch = createAsyncThunk(
//   'jobs/fetchJobs',
//   async (filter: string | null) => {
//     let url = `${config.apiBaseUrl}/list/jobs`;
//     if (filter) {
//       url += `?filter=${encodeURIComponent(filter)}`;
//     }
//     const response = await apiClient(url);
//     const data = await response.json();
//     return data.content as JobDTO[]; // return only the content array
//   }
// );
//


export const fetchJobSearch = createAsyncThunk(
    'jobs/fetchJobs',
    async ({ keyword, page = 0, size = 10 }: { keyword: string | null; page?: number; size?: number }) => {

        let url = `${config.apiBaseUrl}/ESsearch?page=${page}&size=${size}`;

        if (keyword && keyword.trim() !== "") {
            url += `&keyword=${encodeURIComponent(keyword)}`;
        }

        const response = await apiClient(url);
        return await response.json(); // your backend already returns List<>
    }
);


const jobSearch = createSlice({
    name: 'jobSearch',
    initialState,
    reducers: {
        setJobs: (state, action: PayloadAction<JobDTO[]>) => {
            state.list = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchJobSearch.pending, state => { state.loading = true; })
            // .addCase(fetchJobSearch.fulfilled, (state, action: PayloadAction<JobDTO[]>) => {
            //     state.list = action.payload.content;
            //     state.loading = false;
            // })

            .addCase(fetchJobSearch.fulfilled, (state, action) => {

                const { content, hasNext, page } = action.payload;

                if (page === 0) {
                    state.list = content;
                } else {
                    state.list = [...state.list, ...content];
                }

                state.hasNext = hasNext;
                state.page = page;
                state.loading = false;
            })

            .addCase(fetchJobSearch.rejected, state => { state.loading = false; })
            
}
});
export const { setJobs } = jobSearch.actions;

export default jobSearch.reducer;

