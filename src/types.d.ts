// src/types.d.ts

import { Store as ReduxStore, Action } from 'redux';
import { formSlice, sumsValuesSlice, appSlice, resultCardSlice } from './store';

// Define the shape of the root state
type RootState = {
  form: ReturnType<typeof formSlice.reducer>;
  sumsValues: ReturnType<typeof sumsValuesSlice.reducer>;
  app: ReturnType<typeof appSlice.reducer>;
  resultCard: ReturnType<typeof resultCardSlice.reducer>;
};

// Define the type of the Redux store
export type Store = ReduxStore<RootState, Action>;
