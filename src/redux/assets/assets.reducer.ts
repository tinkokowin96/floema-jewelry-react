import AssetsActionTypes from "./assets.types";

const INITIAL_STATE = {
	home: null,
	about: null,
	collections: null,
	product: null,
	isFetching: false,
	errorMessage: undefined,
};

const assetsReducer = (state = INITIAL_STATE, action: any) => {
	switch (action.type) {
		case AssetsActionTypes.FETCH_ASSETS_START:
			return {
				...state,
				isFetching: true,
			};

		case AssetsActionTypes.FETCH_ASSETS_SUCCESS:
			return {
				...state,
				assets: action.payload,
			};

		case AssetsActionTypes.FETCH_ASSETS_FAILURE:
			return {
				...state,
				errorMessage: action.payload,
			};

		default:
			return state;
	}
};

export default assetsReducer;
