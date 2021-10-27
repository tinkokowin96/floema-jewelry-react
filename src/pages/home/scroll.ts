import { round } from "lodash"
import { findFirst, findLast, findWithin } from "../../utils/utils"
import { state } from "./home.state"

const printInd = 4

const scrollMe = () => {
	// state.gallery.forEach((img: any, ind: number) => {
	state.debugChunk.forEach((img: any, ind: number) => {
		img.isBeforeViewport = img.position.y - state.imgHeight > 0
		img.isAfterViewport = img.position.y < -state.viewport.height

		const isWithinViewport = img.position.y < state.imgHeight && img.position.y > -state.viewport.height

		const outDistance = img.isBeforeViewport
			? round(img.position.y - state.imgHeight, 4)
			: img.isAfterViewport
			? round(-img.position.y - state.viewport.height, 4)
			: 0

		const isStateChange = isWithinViewport === img.prevWithinViewport ? false : true

		if (isStateChange) {
			// scroll-up
			if (img.isBeforeViewport) {
				state.firstColumnIndex[img.column] = findWithin(state.firstColumnIndex[img.column], true)
				for (let i = state.numImgInColumn - 1; i >= 0; i--) {
					if (i === state.numImgInColumn - 1) {
						console.log("Before Position Changed....", outDistance, state.imgHeight * 3 + 2)
						findWithin(state.firstColumnIndex[img.column])[0] = false
						findWithin(state.firstColumnIndex[img.column])[i] = true

						findWithin(state.firstColumnIndex[img.column] + i)[i] = false
						findWithin(state.firstColumnIndex[img.column] + i)[i - 1] = true
						findWithin(state.firstColumnIndex[img.column] + i).position.y = findLast(img.column) + outDistance
					} else {
						findWithin(state.firstColumnIndex[img.column] + i)[i] = false
						findWithin(state.firstColumnIndex[img.column] + i)[i - 1] = true
					}
				}
				state.firstColumnIndex[img.column]++
			}

			//scroll-down
			if (img.isAfterViewport) {
				state.firstColumnIndex[img.column] = findWithin(state.firstColumnIndex[img.column], true)
				if (state.firstColumnIndex[img.column] < state.firstColumnIndexOri[img.column]) {
					state.firstColumnIndex[img.column] = state.firstColumnIndexOri[img.column] + state.numImgInColumn - 1
				}
				console.log("up start...", ind, findWithin(state.firstColumnIndex[img.column], true))

				for (let i = 0; i < state.numImgInColumn; i++) {
					if (i === state.numImgInColumn - 2) {
						console.log("After Position Changed....", outDistance)
						findWithin(state.firstColumnIndex[img.column] + i)[i] = false
						findWithin(state.firstColumnIndex[img.column] + i)[i + 1] = true
						findWithin(state.firstColumnIndex[img.column] + i).position.y = findFirst(img.column) - outDistance
					}
					if (i === state.numImgInColumn - 1) {
						findWithin(state.firstColumnIndex[img.column] + i)[i] = false
						findWithin(state.firstColumnIndex[img.column] + i)[0] = true
					} else {
						findWithin(state.firstColumnIndex[img.column] + i)[i] = false
						findWithin(state.firstColumnIndex[img.column] + i)[i + 1] = true
					}
				}
				state.firstColumnIndex[img.column]--
			}
		}

		const scroll = round(img.position.y + state.scroll, 4)

		img.position.setY(scroll)

		img.prevWithinViewport = isWithinViewport
		// if (ind === printInd) {
		// 	console.log(
		// 		ind,
		// 		isWithinViewport,
		// 		state.gallery[ind].position.y,
		// 		state.scroll,
		// 		round(img.position.y - img.prevPos, 4)
		// 	)
		// }

		// img.prevPos = scroll
	})
}

export default scrollMe
