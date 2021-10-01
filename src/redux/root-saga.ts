import { all, call } from "redux-saga/effects";
import { assetSaga } from "./assets/assets.saga";

export default function* rootSaga() {
	yield all([call(assetSaga)]);
}
