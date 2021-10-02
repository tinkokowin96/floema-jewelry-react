import { combineReducers } from "redux";
import assetsReducer from "./assets/assets.reducer";

const rootReducer = combineReducers({
	assets: assetsReducer,
});

export default rootReducer;
