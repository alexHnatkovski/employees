import {createStore, applyMiddleware} from 'redux';
import thunk, {ThunkAction, ThunkMiddleware} from 'redux-thunk';
import {rootReducer} from '../reducers';
import {AppState} from '../models/AppState';
import {ReducerAction} from '../actions';

export default function configureStore() {  
    return createStore(
      rootReducer,
      applyMiddleware(thunk as ThunkMiddleware<AppState, ReducerAction>)
    );
  }