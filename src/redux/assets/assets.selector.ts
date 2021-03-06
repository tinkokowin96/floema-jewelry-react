import { createSelector } from "reselect";

const selectAssets = (state: any) => state.assets;

export const selectLoading = createSelector(
	[selectAssets],
	(assets) => assets.isFetching
);

export const selectHome = createSelector(
	[selectAssets],
	(assets) => assets.home
);

export const selectAbout = createSelector(
	[selectAssets],
	(assets) => assets.about
);

export const selectCollections = createSelector(
	[selectAssets],
	(assets) => assets.collections
);
