const gallery: any = []
const debugChunk: any = []

export const homeState = {
	top: 0,
	scroll: 0,
	scrollDir: "down",

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
	galleryStartPos: 0,
	galleryEndPos: 0,
	debugChunk,

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
	// viewport: {
	// 	fullWidth: 29.464127386259182,
	// },
	aspect: 1.413,
	//breakpoints
	//md-768px
}
