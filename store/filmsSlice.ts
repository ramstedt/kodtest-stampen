import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
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
  url: string;
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
export const selectFilmsListStatus = createSelector(
  (s: RootState) => s.films.listLoading,
  (s: RootState) => s.films.listError,
  (isLoading, error) => ({ isLoading, error })
);

export const selectFilmTitleByUrl = (url: string) => (state: RootState) => {
  const film = state.films.list.find((f) => f.url === url);
  return film ? film.title : null;
};

export const selectFilmTitlesByUrls = (urls: string[]) => (state: RootState) =>
  urls
    .map((url) => state.films.list.find((f) => f.url === url)?.title)
    .filter((title): title is string => Boolean(title));
export default filmsSlice.reducer;
