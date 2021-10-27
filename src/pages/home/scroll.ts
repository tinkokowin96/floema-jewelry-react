import { round } from "lodash"
import { clampPos } from "../../utils/utils"
import { state } from "./home.state"

const scrollMe = () => {
	// state.gallery.forEach((img: any, ind: number) => {
	// console.log(state.scroll)
	state.debugChunk.forEach((img: any) => {
		const scroll = clampPos(round(img.position.y + state.scroll, 4))
		// const scroll = round(img.position.y + state.scroll, 4)
		img.position.setY(scroll)
	})
}

export default scrollMe
