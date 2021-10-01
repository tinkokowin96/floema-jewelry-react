import { all, fork } from "redux-saga/effects";
import { fetchAssetsStart } from "./assets/assets.saga";

export default function* rootSaga() {
	yield all([fork(fetchAssetsStart)]);
}
