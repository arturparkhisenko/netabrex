import { crossTab } from '@storeon/crosstab';
import { persistState } from '@storeon/localstorage';
import { createStoreon } from 'storeon';
import { storeonLogger } from 'storeon/devtools';

export const CHANGE_DATA = 'changeData';
export const CHANGE_VIEW = 'changeView';
export const RESET_DATA = 'resetData';
export const SET_VIEW = 'setView';

/**
 * @typedef {Object.<string, string>} Data map the id to item
 */

/**
 * @typedef {Object} View
 * @property {string} id
 * @property {Object} meta
 */

/**
 * @typedef {Object} State
 * @property {Data} data
 * @property {?View} view
 */

/**
 * Creates initial store state
 *
 * @returns {State} initial state
 */
export const getInitialState = () => {
  return {
    data: {},
    view: null
  };
};

/**
 * Wraps action and reducer into one entity
 *
 * @param {string} action type of the action
 * @param {function} reducer usual or async function
 * @returns {{action, reducer}} reducer
 */
export const createReducer = (action, reducer) => ({ action, reducer });

export const changeData = createReducer(CHANGE_DATA, ({ data }, newData) => {
  return { data: { ...data, ...newData } };
});

export const changeView = createReducer(CHANGE_VIEW, ({ view }, newView) => {
  return { view: { ...view, ...newView } };
});

export const resetData = createReducer(RESET_DATA, () => {
  return { data: getInitialState().data };
});

export const setView = createReducer(SET_VIEW, (state, view) => {
  return { view };
});

/**
 * Sets store initial state and declares reducers
 *
 * @param {Object} instance of the store
 */
export const initStore = store => {
  let reducers = [changeData, changeView, resetData, setView];
  store.on('@init', () => getInitialState());

  reducers.forEach(({ action, reducer }) => {
    store.on(action, reducer);
  });
};

/**
 * Creates the Storeon store instance
 *
 * @example
 * import { useStoreon } from 'storeon/react';
 *
 * const store = createStore();
 *
 * export default const AddForm = () => {
 *   const { dispatch, user } = useStoreon('user');
 *   return <button onClick={() => store.dispatch('changeUser', newUser)}>Change User</button>;
 * }
 *
 * @returns {Object} instance of the store
 */
export const createStore = () => {
  let plugins = [
    persistState(),
    // Currently, we sync everything, @see https://github.com/storeon/crosstab#api
    crossTab({ filter: () => true })
  ];

  if (DEBUG) {
    plugins = [storeonLogger];
  }

  return createStoreon([initStore, ...plugins]);
};
