import { round } from "lodash"
import { homeState } from "../pages/home/home.state"

export function clampPos(
	ind: number,
	position: number,
	addedFromOut: boolean,
	img: any,
	dirStateChange: boolean,
	scrollDir: string,
	isStartAlter = false
) {
	if (dirStateChange && addedFromOut) {
		if (scrollDir === "down") {
			return round(homeState.end + position - homeState.startAdd, 4)
		} else {
			return round(homeState.start + position - homeState.endAdd, 4)
		}
	}

	if (position > homeState.start + homeState.imgHeight / 2 && !addedFromOut) {
		console.log("Out Triggered....")
		/*
		from -> (position - homeState.start) we got scroll. Why we got
		awkward positioning when we use homeState.scroll is as while doing the following
		functin next scroll is in queue and we got difference scroll
		*/
		if (isStartAlter) {
			return round(homeState.end + position - homeState.start, 4)
		}
		img.addedFromOut = true
		return round(homeState.endAdd + position - homeState.start, 4)
	}
	if (position < homeState.end - homeState.imgHeight / 2 && !addedFromOut) {
		if (isStartAlter) {
			return round(homeState.start + position - homeState.end, 4)
		}
		img.addedFromOut = true
		return round(homeState.startAdd + position - homeState.end, 4)
	}
	if (position <= homeState.start && position >= homeState.end) {
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
		} else {
			dirStateChange = false
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
			homeState.scrollDir
		)
		img.position.setY(scrolled)
		prevScroll = homeState.scroll
		homeState.prevScrollDir = homeState.scrollDir
	})
}
