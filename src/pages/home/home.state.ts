const gallery: any = []
const debugChunk: any = []
const collectionItems: any = []

const galleryStartPos: any = {}
const galleryStartAddPos: any = {}
const galleryEndPos: any = {}
const galleryEndAddPos: any = {}

export const homeState = {
	top: 0,
	scroll: 0,
	scrollDir: "down",
	prevScrollDir: "down",
	altered: false,
	collectionItems,

	numColumn: 5,
	numImgInColumn: 0,
	scale: 1,
	gap: 0.5,
	imgWidth: 3,
	imgHeight: 4.238,
	prevImgWidth: 0,

	gallery,
	galleryStartPos,
	galleryStartAddPos,
	galleryEndPos,
	galleryEndAddPos,
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
	aspect: 1.413,

	offsets: [0.351, -1.753, 0, 1.108, -0.961],
}
