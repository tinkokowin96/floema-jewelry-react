import { takeLatest, put } from "redux-saga/effects";
import AssetsActionTypes from "./assets.types";
import Prismic from "@prismicio/client";
import { fetchAssetsFailure, fetchAssetsSuccess } from "./assets.actions";
import { isEmpty } from "lodash";

const API_ENDPOINT = "https://floemajewelrycms.prismic.io/api/v2";
const API_KEY = "9da0d99b7a511943eca83a6479595542";

const Client = Prismic.client(API_ENDPOINT, { accessToken: API_KEY });

export function* fetchAssetsAsync() {
	try {
		const payload = {
			home: {},
			about: {},
			collections: {},
		};

		// home
		//@ts-ignore
		const { results: homeResults } = yield Client.query(
			Prismic.Predicates.at("document.type", "home")
		);
		const homeData = homeResults[0].data;
		const homeRes: Array<string> = [];
		homeData.gallery.forEach(({ image }: any) => {
			homeRes.push(image.url);
		});
		payload.home = homeRes;

		//about
		//@ts-ignore
		const about = yield Client.getSingle("about");
		const aboutData = about.data;
		const aboutRes: any = {
			body: {},
		};
		const aboutResGallery: Array<string> = [];

		aboutData.gallery.forEach(({ image }: any) => {
			aboutResGallery.push(image.url);
		});

		aboutRes.gallery = aboutResGallery;
		aboutData.body.forEach((section: any) => {
			const sectionObj: any = {};
			const sectionItems = [];

			if (!isEmpty(section.items[0])) {
				for (let i = 0; i < section.items.length; i++) {
					sectionItems.push(section.items[i].image.url);
				}
			}

			sectionObj.items = sectionItems;
			sectionObj.primary = section.primary;
			aboutRes.body[section.slice_type] = sectionObj;
		});
		payload.about = aboutRes;

		//collection
		//@ts-ignore
		const { results: collectionResults } = yield Client.query(
			Prismic.Predicates.at("document.type", "collection")
		);
		const collectionRes: any = {};
		for (const product of collectionResults) {
			const data = product.data;
			const collectionObj: any = {};
			for (const productData of data.products) {
				const product = productData.products_product;
				//@ts-ignore
				const { results: productResults } = yield Client.query(
					Prismic.Predicates.at("document.id", product.id)
				);

				collectionObj[product.uid] = productResults[0].data;
			}
			collectionRes[data.title] = collectionObj;
		}
		payload.collections = collectionRes;

		yield put(fetchAssetsSuccess(payload));
	} catch (err) {
		yield put(fetchAssetsFailure(err));
	}
}

export function* fetchAssetsStart() {
	yield takeLatest(AssetsActionTypes.FETCH_ASSETS_START, fetchAssetsAsync);
}
