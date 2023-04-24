import { API_URL } from '../config';
import initialState from './InitialState';
import { setLoading } from './LoadingRedux';

//selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, id) =>
  tables.find((table) => table.id === id);

// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

// action creators
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const updateTable = (id, updatedData) => ({
  type: UPDATE_TABLE,
  payload: { id, updatedData },
});

export const fetchTables = () => {
  return (dispatch) => {
    // console.log('fetchTables start');
    dispatch(setLoading(true));
    // fetch('http://localhost:3131/api/tables')
    fetch(`${API_URL}/tables`)
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

    // console.log('fetchTables end');
  };
};

const tablesReducer = (statePart = initialState.tables, action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case UPDATE_TABLE:
      const updatedTables = statePart.map((table) => {
        if (table.id === action.payload.id) {
          return {
            ...table,
            ...action.payload.updatedData,
          };
        } else {
          return table;
        }
      });
      return updatedTables;
    default:
      return statePart;
  }
};

export default tablesReducer;
