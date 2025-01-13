import { combineReducers } from "redux";
import BookStoreReducer from "./User.reducer";

const rootReducer = combineReducers({
    bookStore:BookStoreReducer
})
export default rootReducer;
