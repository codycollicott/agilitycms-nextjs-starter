import getAgilitySDK from "lib/cms/getAgilitySDK"

/**
 * Get the nested sitemap for the given language code, with caching information added.
 * @param params
 * @returns
 */
export const getSitemapNested = async (params) => {


	const agilitySDK = await getAgilitySDK()

	agilitySDK.config.fetchConfig = {
		next: {
			tags: [`agility-sitemap-nested-${params.languageCode || params.locale}`],
			revalidate: 60,
		},
	}

	return await agilitySDK.getSitemapNested(params)

}