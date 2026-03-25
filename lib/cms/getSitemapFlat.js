import getAgilitySDK from "lib/cms/getAgilitySDK"

/**
 * Get the flat sitemap for the given language code, with caching information added.
 * @param params
 * @returns
 */
export const getSitemapFlat = async (params) => {


	const agilitySDK = await getAgilitySDK()

	agilitySDK.config.fetchConfig = {
		next: {
			tags: [`agility-sitemap-flat-${params.languageCode || params.locale}`],
			revalidate: 60,
		},
	}

	return await agilitySDK.getSitemapFlat(params)

}