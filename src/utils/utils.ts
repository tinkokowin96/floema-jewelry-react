import { round } from "lodash"
import { homeState } from "../pages/home/home.state"

export function clampPos(
	ind: number,
	position: number,
	addedFromOut: boolean,
	img: any,
	dirStateChange: boolean,
	scrollDir: string
) {
	// console.log(ind, dirStateChange, scrollDir, addedFromOut)

	if (dirStateChange && addedFromOut) {
		if (scrollDir === "down") {
			console.log("Hii From Down")
			// img.addedFromOut = false
			// return round(homeState.galleryStartPos + position - homeState.galleryEndAddPos, 4)
			return round(homeState.galleryEndPos + position - homeState.galleryStartAddPos, 4)
		} else {
			// img.addedFromOut = false
			console.log("Hii From Up")
			// return round(homeState.galleryEndPos + position - homeState.galleryStartAddPos, 4)
			return round(homeState.galleryStartPos + position - homeState.galleryEndAddPos, 4)
		}
	}

	if (position > homeState.galleryStartPos && !addedFromOut) {
		/*
		from -> (position - homeState.galleryStartPos) we got scroll. Why we got
		awkward positioning when we use homeState.scroll is as while doing the following
		functin next scroll is in queue and we got difference scroll
		*/

		console.log("Time To Shift End......")
		img.addedFromOut = true
		return round(homeState.galleryEndAddPos + position - homeState.galleryStartPos, 4)
	}
	if (position < homeState.galleryEndPos && !addedFromOut) {
		console.log("Time To Shift Start.....")
		img.addedFromOut = true
		return round(homeState.galleryStartAddPos + position - homeState.galleryEndPos, 4)
	}
	if (position <= homeState.galleryStartPos && position >= homeState.galleryEndPos) {
		img.addedFromOut = false
		return position
	} else {
		return position
	}
}
