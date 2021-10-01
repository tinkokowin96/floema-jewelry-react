import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storageSession from "redux-persist/lib/storage/session";
import assetsReducer from "./assets/assets.reducer";

const persistConfig = {
	key: "root",
	storage: storageSession,
	whitelist: ["assets"],
};

const rootReducer = combineReducers({
	assets: assetsReducer,
});

export default persistReducer(persistConfig, rootReducer);
