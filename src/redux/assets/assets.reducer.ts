import AssetsActionsTypes from "./assets.types";

const INITIAL_STATE = {
	assets: null,
	isFetching: false,
	errorMessage: undefined,
};

const assetsReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case AssetsActionsTypes.FETCH_ASSETS_START:
			return {
				...state,
				isFetching: true,
			};

		case AssetsActionsTypes.FETCH_ASSETS_SUCCESS:
			return {
				...state,
				assets: action.payload,
			};

		case AssetsActionsTypes.FETCH_ASSETS_FAILURE:
			return {
				...state,
				errorMessage: action.payload,
			};

		default:
			return state;
	}
};

export default assetsReducer;
