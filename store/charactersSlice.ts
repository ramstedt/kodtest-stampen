import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { api } from '@/utils/api';
import type { RootState } from '@/store';
import { selectFilmTitlesByUrls } from './filmsSlice';

export interface Character {
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
  homeworld?: string;
  films?: string[];
  url: string;
}

interface CharactersPagePayload {
  results: Character[];
  next: string | null;
  previous: string | null;
  count: number;
  page: number;
}

interface CharactersState {
  list: Character[];
  listLoading: boolean;
  itemLoading: boolean;
  listError: string | null;
  itemError: string | null;
  page?: number;
  next?: string | null;
  previous?: string | null;
  count?: number;
  byUrl?: Record<string, Character>;
}

export const fetchCharacters = createAsyncThunk<
  Character[],
  string | undefined
>('characters/fetchCharacters', async (query: string | undefined, thunkAPI) => {
  const response = await api.get('people/', {
    params: query ? { search: query } : undefined,
    signal: thunkAPI.signal,
  });
  return response.data.results as Character[];
});

export const fetchCharactersPage = createAsyncThunk<
  CharactersPagePayload,
  { page?: number; query?: string } | undefined
>('characters/fetchCharactersPage', async (args, thunkAPI) => {
  const page = args?.page ?? 1;
  const query = args?.query;
  const response = await api.get('people/', {
    params: { page, ...(query ? { search: query } : {}) },
    signal: thunkAPI.signal,
  });
  const { results, next, previous, count } = response.data;
  return { results, next, previous, count, page };
});

export const fetchCharactersByUrls = createAsyncThunk<Character[], string[]>(
  'characters/fetchCharactersByUrls',
  async (urls, thunkAPI) => {
    const unique = Array.from(new Set(urls.filter(Boolean)));
    const results: Character[] = [];
    for (const url of unique) {
      try {
        // Absolute URL will bypass baseURL when passed to axios
        const res = await api.get(url, { signal: thunkAPI.signal });
        results.push(res.data as Character);
      } catch (e) {
        // ignore individual failures; proceed with others
      }
    }
    return results;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    list: [],
    listLoading: false,
    itemLoading: false,
    listError: null,
    itemError: null,
    page: 1,
    next: null,
    previous: null,
    count: 0,
    byUrl: {},
  } as CharactersState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchCharacters.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.listLoading = false;
          state.list = action.payload;
        }
      )
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.listLoading = false;
        state.listError =
          (action.error && action.error.message) || 'Failed to load characters';
      })
      .addCase(fetchCharactersPage.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(
        fetchCharactersPage.fulfilled,
        (state, action: PayloadAction<CharactersPagePayload>) => {
          state.listLoading = false;
          state.list = action.payload.results;
          state.page = action.payload.page;
          state.next = action.payload.next;
          state.previous = action.payload.previous;
          state.count = action.payload.count;
        }
      )
      .addCase(fetchCharactersPage.rejected, (state, action) => {
        state.listLoading = false;
        state.listError =
          (action.error && action.error.message) ||
          'Failed to load characters (paged)';
      })
      .addCase(fetchCharactersByUrls.fulfilled, (state, action) => {
        if (!state.byUrl) state.byUrl = {};
        for (const c of action.payload) {
          if (c?.url) state.byUrl[c.url] = c;
        }
      });
  },
});

export const charactersReducer = charactersSlice.reducer;
export const selectCharacters = (s: RootState) => s.characters.list;
export const selectCharactersListStatus = createSelector(
  (s: RootState) => s.characters.listLoading,
  (s: RootState) => s.characters.listError,
  (isLoading, error) => ({ isLoading, error })
);

export const selectCharacterWithFilmTitles =
  (name: string) => (state: RootState) => {
    const character = state.characters.list.find((c) => c.name === name);
    if (!character) return null;

    const filmTitles = character.films
      ? selectFilmTitlesByUrls(character.films)(state)
      : [];
    return { ...character, filmTitles };
  };

export const selectCharactersPaging = (s: RootState) => {
  const count = s.characters.count ?? 0;
  const page = s.characters.page ?? 1;
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  return {
    page,
    totalPages,
    hasPrev: Boolean(s.characters.previous),
    hasNext: Boolean(s.characters.next),
  };
};

export const selectVisitedCharacters = (s: RootState) =>
  Object.values(s.characters.byUrl || {});

export default charactersSlice.reducer;
