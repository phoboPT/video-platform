import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '~/reducers';
// import { loadState, saveState } from '~/utils/localStorage';

export default (initialState = {}) => {
  // Uncomment this line in case you wish to load reducer info from localStorage
  // If it exists, load the localStorage info to the redux state
  // const persistedState = loadState(initialState);

  const store = createStore(
    rootReducer,
    // persistedState || initialState,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );

  // Uncomment this line in case you wish to save reducer info
  // to the localStorage and import the saveState utils of localStorage
  // saveState(store.getState());

  return store;
};
