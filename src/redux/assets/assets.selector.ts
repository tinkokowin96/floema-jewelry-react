import { createSelector } from "reselect";

const selectAssets = (state: any) => state.assets;

export const selectHome = createSelector(
	[selectAssets],
	(assets) => assets.home
);
