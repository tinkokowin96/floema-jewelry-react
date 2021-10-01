import { all, takeLatest, call, put } from "redux-saga/effects";
import AssetsActionTypes from "./assets.types";
import Prismic from "@prismicio/client";
import { fetchAssetsFailure, fetchAssetsSuccess } from "./assets.actions";

const API_ENDPOINT = "https://floemajewelrycms.prismic.io/api/v2";
const API_KEY = "9da0d99b7a511943eca83a6479595542";

const Client = Prismic.client(API_ENDPOINT, { accessToken: API_KEY });

export function* fetchAssetsAsync() {
	console.log("Please Sayyyy Sayyy");
	try {
		console.log("Hiiiiiii");
		//@ts-ignore
		const results = yield Client.query("");
		console.log(results);
		yield put(fetchAssetsSuccess(results));
	} catch (err) {
		console.log(err);
		yield put(fetchAssetsFailure(err));
	}
}

export function* fetchAssetsStart() {
	console.log("hhhh");
	yield takeLatest(AssetsActionTypes.FETCH_ASSETS_START, fetchAssetsAsync);
}

// export function* assetSaga() {
// 	yield all([call(fetchAssetsStart)]);
// }
