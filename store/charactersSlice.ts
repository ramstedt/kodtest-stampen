import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { api } from '@/utils/api';
import type { RootState } from '@/store';

export interface Character {
  name: string;
  url: string;
}

interface CharactersState {
  list: Character[];
  listLoading: boolean;
  itemLoading: boolean;
  listError: string | null;
  itemError: string | null;
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

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    list: [],
    listLoading: false,
    itemLoading: false,
    listError: null,
    itemError: null,
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

export default charactersSlice.reducer;
