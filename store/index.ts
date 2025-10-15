import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from './filmsSlice';
import charactersReducer from './charactersSlice';

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    characters: charactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
