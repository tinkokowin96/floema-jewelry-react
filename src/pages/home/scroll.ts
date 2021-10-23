import { state } from "./home.state";

const scrollMe = () => {
	// state.gallery.forEach((img: any, ind: number) => {
	const ind = 10;
	const img = state.gallery[ind];

	img.isBeforeViewport = img.position.y - state.imgHeight > 0;
	img.isAfterViewport = img.position.y < -state.viewport.height;

	const currentState = img.isBeforeViewport
		? "before"
		: img.isAfterViewport
		? "after"
		: "inside";

	if (currentState !== img.prevState && img.prevState !== null) {
		img.stateChange = true;
	} else {
		img.stateChange = false;
	}

	img.prevState = currentState;

	const scroll = img.position.y + state.scroll;

	if (state.scrollDir === "down" && img.isBeforeViewport && img.stateChange) {
		console.log("down entered again...");
		console.log(`down before ${img.newPos}`);
		img.newPos = -state.galleryHeightVH;
		console.log(`newPos from down->${img.newPos}`);
		img.isBeforeViewport = false;
		img.isAfterViewport = false;
		img.prevState = currentState;
		img.addNewPos = true;
	}

	if (state.scrollDir === "up" && img.isAfterViewport && img.stateChange) {
		console.log("up enter again");
		console.log(`up before ${img.newPos}`);
		img.newPos = +state.galleryHeightVH;
		console.log(`newPos from up->${img.newPos}`);
		img.isBeforeViewport = false;
		img.isAfterViewport = false;
		img.prevState = currentState;
		img.addNewPos = true;
	}

	if (currentState === "inside" && img.stateChange) {
		console.log("entered to inside....");
		img.newPos = 0;
		if (state.scrollDir === "down") {
			console.log("entered from bottom", state.galleryPosY[ind]);
			if (state.galleryOriPosY[ind] !== state.galleryPosY[ind]) {
				state.galleryPosY[ind] += state.galleryHeightVH;
			}
		} else {
			console.log("entered form top....", state.galleryPosY[ind]);
			if (state.galleryOriPosY[ind] !== state.galleryPosY[ind]) {
				state.galleryPosY[ind] -= state.galleryHeightVH;
			}
		}
	}

	img.position.setY(scroll);

	if (img.addNewPos) {
		img.position.setY(state.galleryPosY[ind] + img.newPos);
		img.addNewPos = false;
		state.galleryPosY[ind] += img.newPos;
	}

	console.log(img.position.y);

	// if (ind === 0 || ind === 5 || ind === 10) {
	// 	console.log(img.position.y);
	// }
	// });
};

export default scrollMe;
