
import getAgilitySDK from "lib/cms/getAgilitySDK"


/**
 * Get a content item with caching information added.
 * @param params
 * @returns
 */
export const getContentItem = async (params) => {

	const agilitySDK = await getAgilitySDK()

	agilitySDK.config.fetchConfig = {
		next: {
			tags: [`agility-content-${params.contentID}-${params.languageCode || params.locale}`],
			revalidate: 60,
		},
	}

	return await agilitySDK.getContentItem(params)

}