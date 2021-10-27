import { state } from "../pages/home/home.state"

export function lerp(p1: number, p2: number, t: number) {
	return p1 + (p2 - p1) * t
}

export function findWithin(ind: number, index = false) {
	if (ind + 1 > state.numImgInColumn) {
		const newInd = ind % state.numImgInColumn
		if (index) {
			return newInd
		}
		return state.gallery[newInd]
	} else {
		if (index) {
			return ind
		}
		return state.gallery[ind]
	}
}

export function findLast(column: number) {
	const lastIndex =
		state.firstColumnIndexOri[column] + state.numImgInColumn - 3
	return state.galleryOriPosY[lastIndex] - state.imgHeight - state.gap
}

export function findFirst(column: number) {
	const firstIndex = state.firstColumnIndexOri[column]
	return state.galleryOriPosY[firstIndex] + state.imgHeight + state.gap
}

// export function clampPos(position: number) {
// 	if (position > state.galleryStartPos) {
// 		return state.galleryEndPos + position - state.galleryStartPos
// 	}
// 	if (position < state.galleryEndPos) {
// 		return state.galleryStartPos - (position - state.galleryEndPos)
// 	} else {
// 		return position
// 	}
// }
