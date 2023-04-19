import initialState from './InitialState';
import { setLoading } from './LoadingRedux';

// export const ustaw = setLoading(false)

//selectors
export const getAllTables = (state) => state.tables;

// export const getIsLoading = (state) => state.isLoading;

export const getTableById = ({ tables }, id) =>
  tables.find((table) => table.id === id);
// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

// action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });

export const fetchTables = () => {
  return (dispatch) => {
    console.log('fetchTables start');
    dispatch(setLoading(true));
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => {
        console.log('fetchTables received data:', tables);
        dispatch(updateTables(tables));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setLoading(false));
      });
    // .then((tables) => dispatch(updateTables(tables)))
    // .then(() => dispatch(setLoading(false)));
    console.log('fetchTables end');
  };
};

const tablesReducer = (statePart = initialState.tables, action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default tablesReducer;
