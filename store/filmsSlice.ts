import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/utils/api';
import type { RootState } from '@/store';

export interface Film {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  created: string;
  edited: string;
}

interface FilmsState {
  list: Film[];
  listLoading: boolean;
  itemLoading: boolean;
  listError: string | null;
  itemError: string | null;
}

export const fetchFilms = createAsyncThunk<Film[], string | undefined>(
  'films/fetchFilms',
  async (query: string | undefined, thunkAPI) => {
    const response = await api.get('films/', {
      params: query ? { search: query } : undefined,
      signal: thunkAPI.signal,
    });
    return response.data.results as Film[];
  }
);

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    list: [],
    listLoading: false,
    itemLoading: false,
    listError: null,
    itemError: null,
  } as FilmsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.listLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.listLoading = false;
        state.listError =
          (action.error && action.error.message) || 'Failed to load films';
      });
  },
});

export const filmsReducer = filmsSlice.reducer;
export const selectFilms = (s: RootState) => s.films.list;
export const selectFilmsListStatus = (s: RootState) => ({
  isLoading: s.films.listLoading,
  error: s.films.listError,
});

export default filmsSlice.reducer;
