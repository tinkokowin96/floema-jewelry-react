import createSagaMiddleware from "@redux-saga/core";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
	//@ts-ignore
	middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
