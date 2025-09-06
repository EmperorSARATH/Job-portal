// searchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  keyword: string;
  filters: {
    category?: string;
    location?: string;
    priceRange?: [number, number];
    // ... add more as needed
  };
};

const initialState: FilterState = {
  keyword: '',
  filters: {},
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState['filters']>) => {
      state.filters = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {};
    },
  },
});

export const { setKeyword, setFilters, resetFilters } = searchSlice.actions;
export default searchSlice.reducer;

