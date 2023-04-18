import initialState from './initialState';

const SET_LOADING = 'SET_LOADING';
export const LOADING_START = 'app/loading/LOADING_START';
export const LOADING_END = 'app/loading/LOADING_END';

// Action creators
export const setLoading = (isLoading) => ({ type: SET_LOADING, isLoading });

// Reducer
const loadingReducer = (statePart = initialState.isLoading, action) => {
  switch (action.type) {
    case LOADING_START:
      return { ...statePart, isLoading: true };
    case LOADING_END:
      return { ...statePart, isLoading: false };
    default:
      return statePart; // zwracaj stan początkowy
  }
};

export default loadingReducer;