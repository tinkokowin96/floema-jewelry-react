import AssetsActionsTypes from "./assets.types";

export const fetchAssetsStart = () => ({
  type: AssetsActionsTypes.FETCH_ASSETS_START,
});

export const fetchAssetsSuccess = (assets: Object) => ({
  type: AssetsActionsTypes.FETCH_ASSETS_SUCCESS,
  payload: assets,
});

export const fetchAssetsFailure = (error: any) => ({
  type: AssetsActionsTypes.FETCH_ASSETS_FAILURE,
  payload: error,
});
