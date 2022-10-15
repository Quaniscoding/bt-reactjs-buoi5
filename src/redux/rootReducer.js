import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { SinhVienReducer } from "./Reducers/SinhVienReducer";
const rootReducer = combineReducers({
    SinhVienReducer
})
export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
