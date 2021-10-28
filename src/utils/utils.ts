import { homeState } from "../pages/home/home.state"

export function clampPos(position: number) {
	if (position > homeState.galleryStartPos) {
		return homeState.galleryEndPos + position - homeState.galleryStartPos
	}
	if (position < homeState.galleryEndPos) {
		return homeState.galleryStartPos + (position - homeState.galleryEndPos)
	} else {
		return position
	}
}
