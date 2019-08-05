import { combineReducers } from "redux";
import News from './News';

export const rootReducer = combineReducers({
    News,
});

export type rootState = ReturnType<typeof rootReducer>
