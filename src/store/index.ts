import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialFormState = {
  principal: '',
  monthlyContribution: '',
  years: '',
  interestRate: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState: initialFormState,
  reducers: {
    setReduxPrincipal(state, action) {
      state.principal = action.payload;
    },
    setReduxMonthlyContribution(state, action) {
      state.monthlyContribution = action.payload;
    },
    setReduxYears(state, action) {
      state.years = action.payload;
    },
    setReduxInterestRate(state, action) {
      state.interestRate = action.payload;
    },
  },
});
//-----------------------------------------------
const initialSumsValuesState = {
    futureValue:0,
      totalInterest:0,
      futureValueArray:[],
  };

const sumsValuesSlice = createSlice({
  name: 'sumsValues',
  initialState: initialSumsValuesState,
  reducers: {
    setReduxfutureValue(state, action) {
      state.futureValue = action.payload;
    },
    setReduxtotalInterest(state, action) {
      state.totalInterest = action.payload;
    },
    setReduxfutureValueArray(state, action) {
      state.futureValueArray = action.payload;
    }
  },
});

//-----------------------------------------------
const initialAppState = {
    submit:false
  };

const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    setReduxSubmit(state, action) {
      state.submit = action.payload;
    },
  },
});
//-----------------------------------------------

const initialResultCardState = {
    id:-1
  };

const resultCardSlice = createSlice({
  name: 'ResultCard',
  initialState: initialResultCardState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

//-----------------------------------------------
const store = configureStore({
    reducer: {
      form: formSlice.reducer,
      sumsValues: sumsValuesSlice.reducer,
      app: appSlice.reducer,
      resultCard: resultCardSlice.reducer,
    },
//   reducer: formSlice.reducer,
});

export const formActions = formSlice.actions;
export const sumsValuesActions = sumsValuesSlice.actions;
export const appActions = appSlice.actions;
export const resultCardActions = resultCardSlice.actions;

export default store;
