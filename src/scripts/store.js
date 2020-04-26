import { crossTab } from '@storeon/crosstab';
import { persistState } from '@storeon/localstorage';
import { createStoreon } from 'storeon';
import { storeonLogger } from 'storeon/devtools';

import * as Constants from './constants';

export const RESET_DATA = 'resetData';
export const SET_DATA = 'setData';
export const SET_MODE = 'setMode';

/**
 * @typedef {Object} State
 * @property {?string} data
 * @property {string} mode
 */

/**
 * Creates initial store state
 *
 * @returns {State} initial state
 */
export const getInitialState = () => {
  return {
    data: '# Hello\nStart writing here',
    mode: Constants.MODE_EDITOR
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

export const resetData = createReducer(RESET_DATA, () => {
  return { data: getInitialState().data };
});

export const setData = createReducer(SET_DATA, (state, data) => {
  return { data };
});

export const setMode = createReducer(SET_MODE, (state, mode) => {
  return { mode };
});

/**
 * Sets store initial state and declares reducers
 *
 * @param {Object} instance of the store
 */
export const initStore = store => {
  let reducers = [resetData, setData, setMode];
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
