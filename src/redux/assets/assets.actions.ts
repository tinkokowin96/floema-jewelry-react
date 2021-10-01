import AssetsActionTypes from "./assets.types";

export const fetchAssetsStart = () => ({
	type: AssetsActionTypes.FETCH_ASSETS_START,
});

export const fetchAssetsSuccess = (assets: Object) => ({
	type: AssetsActionTypes.FETCH_ASSETS_SUCCESS,
	payload: assets,
});

export const fetchAssetsFailure = (error: any) => ({
	type: AssetsActionTypes.FETCH_ASSETS_FAILURE,
	payload: error,
});
