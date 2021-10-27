import { state } from "../pages/home/home.state"

export function clampPos(position: number) {
	if (position > state.galleryStartPos) {
		return state.galleryEndPos + position - state.galleryStartPos
	}
	if (position < state.galleryEndPos) {
		console.log(
			"scroll up time....",
			position,
			state.galleryEndPos,
			state.galleryStartPos + (position - state.galleryEndPos)
		)
		return state.galleryStartPos + (position - state.galleryEndPos)
	} else {
		return position
	}
}
