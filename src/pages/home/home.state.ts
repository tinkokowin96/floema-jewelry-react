const gallery: any = [];
const galleryPosY: number[] = [];
const galleryOriPosY: number[] = [];

export const state = {
	top: 0,
	scroll: 0,
	scrollDir: "down",

	page: 0,
	numColumn: 5,
	scale: 1,
	gap: 0.5,
	imgWidth: 3,
	imgHeight: 4.238267148014439,

	galleryHeight: 0,
	gallery,
	galleryPosY,
	galleryOriPosY,
	galleryHeightVH: 0,

	size: { width: 1909, height: 999 },
	viewport: {
		initialDpr: 1,
		dpr: 1,
		width: 29.325870271308016,
		height: 15.346539759579208,
		aspect: 1.9109109109109108,
	},

	//constants
	breakpoint: {
		md: 11.704213044048494,
	},
	pxPerUnit: 65.09610737341822, //size.width/viewport.width
	// viewport: {
	// 	fullWidth: 29.464127386259182,
	// },
	aspect: 1.412755716004813,
	//breakpoints
	//md-768px
};
