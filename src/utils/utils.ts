import { round } from "lodash"
import { homeState } from "../pages/home/home.state"

export function clampPos(
	ind: number,
	position: number,
	addedFromOut: boolean,
	img: any,
	dirStateChange: boolean,
	scrollDir: string,
	column: number
) {
	if (dirStateChange && addedFromOut) {
		if (scrollDir === "down") {
			return round(homeState.galleryEndPos[column] + position - homeState.galleryStartAddPos[column], 4)
		} else {
			return round(homeState.galleryStartPos[column] + position - homeState.galleryEndAddPos[column], 4)
		}
	}

	if (position > homeState.galleryStartPos[column] + homeState.imgHeight && !addedFromOut) {
		/*
		from -> (position - homeState.galleryStartPos[column]) we got scroll. Why we got
		awkward positioning when we use homeState.scroll is as while doing the following
		functin next scroll is in queue and we got difference scroll
		*/
		img.addedFromOut = true
		return round(homeState.galleryEndAddPos[column] + position - homeState.galleryStartPos[column], 4)
	}
	if (position < homeState.galleryEndPos[column] - homeState.imgHeight && !addedFromOut) {
		img.addedFromOut = true
		return round(homeState.galleryStartAddPos[column] + position - homeState.galleryEndPos[column], 4)
	}
	if (position <= homeState.galleryStartPos[column] && position >= homeState.galleryEndPos[column]) {
		img.addedFromOut = false
		return position
	} else {
		return position
	}
}

let prevScroll = 0

export const canvasScroll = () => {
	let dirStateChange = false
	homeState.gallery.forEach((img: any, ind: number) => {
		// homeState.debugChunk.forEach((img: any, ind: number) => {
		if (homeState.scrollDir !== homeState.prevScrollDir) {
			dirStateChange = true
		}

		if (homeState.scroll < -3 || homeState.scroll > 3) {
			homeState.scroll = prevScroll
		}

		const scrolled = clampPos(
			ind,
			round(img.position.y + homeState.scroll, 4),
			img.addedFromOut,
			img,
			dirStateChange,
			homeState.scrollDir,
			img.column
		)
		img.position.setY(scrolled)
		prevScroll = homeState.scroll
		homeState.prevScrollDir = homeState.scrollDir
	})
}
