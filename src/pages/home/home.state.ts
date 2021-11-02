const gallery: any = []
const debugChunk: any = []
const collectionItems: any = []

export const homeState = {
	top: 0,
	scroll: 0,
	scrollDir: "down",
	prevScrollDir: "down",
	altered: false,
	collectionItems,

	page: 0,
	numColumn: 5,
	numImgInColumn: 0,
	scale: 1,
	gap: 0.5,
	imgWidth: 3,
	imgHeight: 4.238,

	galleryHeight: 0,
	gallery,
	galleryHeightVH: 0,
	debugChunk,
	start: 0,
	end: 0,
	startAdd: 0,
	endAdd: 0,

	size: { width: 1909, height: 999 },
	viewport: {
		initialDpr: 1,
		dpr: 1,
		width: 29.326,
		height: 15.347,
		aspect: 1.911,
	},

	//constants
	breakpoint: {
		md: 11.704,
	},
	pxPerUnit: 65.096, //size.width/viewport.width
	aspect: 1.413,
	offsets: [0.6139, 1.3448, 1.9019, 2.2016, 2.5088], //shift position in every columns for more immersive exp
}
